import { ReactiveVar, useMutation, useReactiveVar } from '@apollo/client';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  StackDivider,
  Text,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';

import {
  CreateTechnologyDocument,
  CreateTechnologyMutation,
  CreateTechnologyMutationVariables,
  UpdateTechnologyByIdDocument,
  UpdateTechnologyByIdMutation,
  UpdateTechnologyByIdMutationVariables,
} from '@idleverse/galaxy-gql';
import { useEffect, useState } from 'react';

import { colorsVar, resourcesVar, technologiesVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
import {
  TreeNodeWithDepth,
  selectedNodeVar,
  treeNodesVar,
} from '../../state/shared-tree.state';
import { TechnologyNode } from '../../utils/create-tree-from-technologies-query';
import { ImagePicker } from './image-picker';

export const TechTreeNodeEditor = () => {
  const { bg, border } = useUiBackground();

  const [creatingTech, setCreatingTech] = useState(false);

  const selectedNode = useReactiveVar(selectedNodeVar);
  const treeNodes = useReactiveVar(treeNodesVar);

  const technologies = useReactiveVar(technologiesVar);

  const toast = useToast();

  const [createTechnology] = useMutation<
    CreateTechnologyMutation,
    CreateTechnologyMutationVariables
  >(CreateTechnologyDocument);

  const [updateTechnology] = useMutation<
    UpdateTechnologyByIdMutation,
    UpdateTechnologyByIdMutationVariables
  >(UpdateTechnologyByIdDocument, {
    onCompleted: () => {
      toast({ title: 'Technology updated', status: 'success' });
    },
    onError: (error) => {
      toast({ title: 'Something went wrong', status: 'error' });
      console.error(error);
    },
  });

  const saveHandler = async (
    type: 'new' | 'update',
    root: boolean,
    formState: {
      name: string;
      description: string;
      researchCost: number;
      imageUrl: string;
      parentId?: string;
    }
  ) => {
    if (type === 'update') {
      const {
        data: { update_technology_by_pk: updatedTech },
      } = await updateTechnology({
        variables: {
          id: selectedNode.id,
          input: {
            name: formState.name,
            description: formState.description,
            research_cost: formState.researchCost,
            image_url: formState.imageUrl,
          },
        },
      });

      const techsWithoutSelected = technologies.filter(
        ({ id }) => id !== selectedNode?.id
      );

      technologiesVar([...techsWithoutSelected, updatedTech]);
      console.log('techs updated after update');
    }
    if (type === 'new') {
      const {
        data: { insert_technology_one: newTech },
      } = await createTechnology({
        variables: {
          input: {
            root,
            name: formState.name,
            description: formState.description,
            research_cost: formState.researchCost,
            image_url: formState.imageUrl,
          },
        },
      });

      const parent = technologies.find(({ id }) => id === formState.parentId);

      if (!root) {
        // Inserting arrays into postgres requires a string format
        const newChildren = `{${[
          ...parent.children,
          newTech.id,
        ]}}` as unknown as string[];

        // now update parent's children
        const {
          data: { update_technology_by_pk: updatedParent },
        } = await updateTechnology({
          variables: {
            id: formState.parentId,
            input: {
              children: newChildren,
            },
          },
        });

        const techsWithoutParent = technologies.filter(
          ({ id }) => id !== parent?.id
        );
        // finally update reactive var to avoid race conditions
        technologiesVar([...techsWithoutParent, newTech, updatedParent]);
        console.log('techs updated after creation');
      } else {
        technologiesVar([newTech]);
        console.log('techs updated after ROOT creation');
      }
    }
    setCreatingTech(false);
  };

  return (
    <VStack
      spacing={5}
      padding={3}
      position="absolute"
      alignItems="start"
      bgColor={bg}
      bottom={0}
      right={0}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderBottom="unset"
      borderRight="unset"
      divider={<StackDivider borderColor={border} />}
    >
      {treeNodes.length && (
        <>
          {!selectedNode && (
            <>
              {!creatingTech && (
                <>
                  <Text fontSize="lg" mb={5}>
                    Select a node to start editing, or:
                  </Text>
                  <Button onClick={() => setCreatingTech(true)}>
                    Create new Technology
                  </Button>
                </>
              )}

              {creatingTech && (
                <TreeNodeForm
                  onSave={saveHandler}
                  onCancel={() => setCreatingTech(false)}
                />
              )}
            </>
          )}
          {selectedNode && (
            <TreeNodeForm
              onSave={saveHandler}
              onCancel={() => setCreatingTech(false)}
            />
          )}
        </>
      )}
      {!treeNodes.length && (
        <VStack>
          <Text fontSize="lg">Start by creating a root node:</Text>
          <TreeNodeForm root={true} onSave={saveHandler} />
        </VStack>
      )}
    </VStack>
  );
};

const TreeNodeForm = ({
  root = false,
  onCancel,
  onSave,
}: {
  root?: boolean;
  onSave: (
    type: 'new' | 'update',
    root: boolean,
    formState: {
      name: string;
      description: string;
      researchCost: number;
      imageUrl: string;
      parentId?: string;
    }
  ) => Promise<unknown>;
  onCancel?: () => void;
}) => {
  const { border } = useUiBackground();
  const { primary, secondary } = useReactiveVar(colorsVar);

  const technologies = useReactiveVar(technologiesVar);
  const treeNodes = useReactiveVar(
    treeNodesVar as ReactiveVar<TreeNodeWithDepth<TechnologyNode>[]>
  );
  const selectedNode = useReactiveVar(
    selectedNodeVar as ReactiveVar<TreeNodeWithDepth<TechnologyNode>>
  );
  const resources = useReactiveVar(resourcesVar);
  const [saveProcessing, setSaveProcessing] = useState(false);

  const [name, setName] = useState(selectedNode?.value.name || '');
  const [description, setDescription] = useState(
    selectedNode?.value.description || ''
  );
  const [researchCost, setResearchCost] = useState(
    selectedNode?.value.research_cost || 0
  );

  const [parentId, setParentId] = useState<string>(undefined);
  const [imageUrl, setImageUrl] = useState(selectedNode?.value.image_url || '');

  const nameValid = !technologies
    .filter((tech) => tech.name !== selectedNode?.value.name)
    .find((tech) => tech.name === name);

  const nameLength = name.length >= 3;

  const saveHandler = async () => {
    setSaveProcessing(true);

    await onSave(selectedNode ? 'update' : 'new', root, {
      name,
      description,
      researchCost,
      imageUrl,
      parentId,
    });

    setSaveProcessing(false);
  };

  const dirty = () => {
    if (selectedNode) {
      const {
        value: {
          name: originalName,
          description: originalDescription,
          research_cost: originalResearchCost,
          image_url: originalImageUrl,
        },
      } = selectedNode;

      const condition =
        originalName !== name ||
        originalDescription !== description ||
        originalResearchCost !== researchCost ||
        originalImageUrl !== imageUrl;

      return condition;
    }
    return true;
  };

  useEffect(() => {
    if (selectedNode) {
      selectedNodeVar(treeNodes.find((node) => node.id === selectedNode.id));
    }
  }, [treeNodes]);

  useEffect(() => {
    if (selectedNode) {
      setName(selectedNode?.value.name);
      setDescription(selectedNode?.value.description || '');
      setResearchCost(selectedNode?.value.research_cost);
      setImageUrl(selectedNode?.value.image_url);
    }
  }, [selectedNode]);

  return (
    <VStack
      width="100%"
      spacing={4}
      divider={<StackDivider borderColor={border} />}
    >
      {!root && (
        <HStack width="100%">
          <Text fontSize="lg">Currently Editing:</Text>
          <Text color={`${secondary}.200`} minW={200} textAlign="end">
            {selectedNode?.value.name || 'NEW TECH'}
          </Text>
        </HStack>
      )}
      {selectedNode?.parent && (
        <HStack width="100%">
          <Text fontSize="sm" color={`${primary}.300`}>
            Child of:
          </Text>
          <Text fontSize="sm" color={`${secondary}.300`}>
            {selectedNode?.parent?.value.name || 'none'}
          </Text>
        </HStack>
      )}
      {selectedNode?.children?.length && (
        <HStack width="100%" minH={42}>
          <Text fontSize="sm" color={`${primary}.300`}>
            Parent to:
          </Text>
          <Text fontSize="sm" maxW={300} overflowWrap="break-word">
            {selectedNode.children.map((child) => child.value.name).join(', ')}
          </Text>
        </HStack>
      )}

      <FormControl isInvalid={!nameValid || !nameLength}>
        <FormLabel>Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />

        {nameValid && nameLength && (
          <FormHelperText>Must be unique</FormHelperText>
        )}
        {!nameValid && (
          <FormErrorMessage>Technology name already exists</FormErrorMessage>
        )}
        {!nameLength && <FormErrorMessage>Min length of 3</FormErrorMessage>}
      </FormControl>

      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Research cost</FormLabel>
        <NumberInput
          value={researchCost}
          min={0}
          onChange={(e) => setResearchCost(parseInt(e))}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel>Image</FormLabel>
        <ImagePicker
          config={resources.map(({ type, image_url }) => ({
            name: type,
            imageUrl: image_url,
          }))}
          value={imageUrl}
          onChange={(imageUrl) => setImageUrl(imageUrl)}
        />
      </FormControl>

      {!root && !selectedNode && (
        <FormControl isInvalid={!parentId}>
          <FormLabel>Parent</FormLabel>
          <Select
            value={parentId}
            placeholder="Select parent"
            onChange={(e) => setParentId(e.target.value)}
          >
            {technologies.map((tech, i) => (
              <option key={i} value={tech.id}>
                {tech.name}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      <HStack width="100%">
        <Button
          flexGrow={1}
          flexBasis={0}
          colorScheme={secondary}
          isDisabled={
            !dirty() ||
            !nameValid ||
            !nameLength ||
            (!root && !selectedNode && !parentId)
          }
          isLoading={saveProcessing}
          onClick={saveHandler}
        >
          Save
        </Button>
        <Button
          flexGrow={1}
          flexBasis={0}
          onClick={() => {
            selectedNodeVar(undefined);
            onCancel && onCancel();
          }}
        >
          Cancel
        </Button>
      </HStack>
    </VStack>
  );
};
