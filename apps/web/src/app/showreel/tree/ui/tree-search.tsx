import { useReactiveVar } from '@apollo/client';
import { SearchIcon } from '@chakra-ui/icons';
import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useUiBackground } from '../../../hooks/use-ui-background';
import {
  hoveredNodeVar,
  searchResultsVar,
  selectedNodeVar,
  treeNodesVar,
} from '../state/shared-tree.state';

import { Box, Button } from '@chakra-ui/react';
import { search as fuzzySearch } from 'fast-fuzzy';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';
import { colorsVar } from '../../../_state/colors';

export const TreeSearch = () => {
  const { bg, border } = useUiBackground();
  const { secondary } = useReactiveVar(colorsVar);

  const [inputValue, setInputValue] = useState<string>('');
  const treeNodes = useReactiveVar(treeNodesVar);
  const searchResults = useReactiveVar(searchResultsVar);
  const selectedNode = useReactiveVar(selectedNodeVar);

  const updateSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    hoveredNodeVar(undefined);
    setInputValue(event.target.value);
    searchResultsVar(
      fuzzySearch(event.target.value, treeNodes, {
        keySelector: (obj) => obj.value.name,
        threshold: 0.9,
        ignoreSymbols: false,
      })
    );
  };

  return (
    <VStack
      spacing={5}
      padding={[0, 2, 3]}
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top={['unset', 0]}
      bottom={[0, 'unset']}
      right={['unset', 0]}
      width={['100vw', 'unset']}
      borderWidth={[0, '1px']}
      borderRadius={['5px', 'unset']}
      borderStyle="solid"
      borderColor={border}
      borderTop="unset"
      borderRight="unset"
      flexDirection={['column-reverse', 'column']}
      divider={<StackDivider borderColor={border} />}
    >
      <HStack width="100%">
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color={border} />}
          />
          <Input
            {...responsiveFontProps}
            bg={bg}
            borderColor={border}
            value={inputValue}
            onChange={updateSearchInput}
            placeholder="search for nodes"
          />
        </InputGroup>
      </HStack>
      {inputValue && searchResults?.length && (
        <VStack width="100%" spacing={1}>
          {searchResults.map((node, i) => (
            <Box
              key={i}
              as={Button}
              width="100%"
              whiteSpace="normal"
              transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
              px="8px"
              disabled={selectedNode?.id === node.id}
              borderRadius="3px"
              fontWeight="semibold"
              fontSize={['xxs', 'xs', 'xs', 'sm', 'md']}
              color="white.900"
              _hover={{ bg: `${secondary}.500` }}
              _active={{
                bg: 'whiteAlpha.300',
                borderColor: `${secondary}.700`,
              }}
              paddingInlineStart={4}
              paddingInlineEnd={4}
              onClick={() => selectedNodeVar(node)}
              onMouseEnter={() => hoveredNodeVar(node)}
              onMouseLeave={() => hoveredNodeVar(undefined)}
            >
              <Text>{node.value.name}</Text>
            </Box>
          ))}
        </VStack>
      )}
      {inputValue && !searchResults.length && (
        <HStack>
          <Text {...responsiveFontProps}>No results found.</Text>
        </HStack>
      )}
    </VStack>
  );
};
