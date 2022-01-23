import { useMutation, useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  SetNameByUserIdDocument,
  SetNameByUserIdMutation,
  SetNameByUserIdMutationVariables,
} from '@idleverse/galaxy-gql';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { ResponsiveGrid } from '../components/layout';
import { ToolBar } from '../containers/toolbar/toolbar';
import { layoutVar } from '../_state/persisted-reactive-variables';
import { selfVar } from '../_state/reactive-variables';

type Inputs = {
  displayName: string;
};

export const Registration = () => {
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({
    displayName: display_name,
  }) =>
    setDisplayName({
      variables: { display_name },
    });

  const self = useReactiveVar(selfVar);
  const layoutConfig = useReactiveVar(layoutVar);

  const [setDisplayName, { data, loading, error }] = useMutation<
    SetNameByUserIdMutation,
    SetNameByUserIdMutationVariables
  >(SetNameByUserIdDocument, {
    onCompleted: (data) => {
      selfVar({
        ...self,
        display_name: data.setDisplayName.updatedName,
      });

      window.location.reload();
    },
  });

  return (
    <ResponsiveGrid {...layoutConfig} sideNav={false}>
      <ToolBar></ToolBar>
      <main>
        <Box
          height="100%"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack
              divider={<StackDivider borderColor="gray.500" />}
              spacing={5}
              align="stretch"
              maxWidth={450}
            >
              <Text fontSize="3xl" textAlign="center">
                Registration
              </Text>

              <Text>
                Welcome to Idleverse! Please submit some basic user information
                to begin.
              </Text>

              <FormControl
                isInvalid={!!errors.displayName || false}
                marginTop={3}
                marginBottom={3}
              >
                <FormLabel htmlFor="displayName">Display Name</FormLabel>
                <Input
                  id="displayName"
                  placeholder="Enter display name"
                  {...register('displayName', {
                    required: 'A display name is required',
                    minLength: {
                      value: 3,
                      message: 'Minimum length should be 3',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.displayName && errors.displayName.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                mt={4}
                colorScheme="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </main>
    </ResponsiveGrid>
  );
};
