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
import { treeNodesVar } from '../state/tree.state';

import { search as fuzzySearch } from 'fast-fuzzy';

export const TreeSearch = () => {
  const { bg, border } = useUiBackground();

  const [searchResults, setSearchResults] =
    useState<ReturnType<typeof treeNodesVar>>();
  const [inputValue, setInputValue] = useState<string>('');
  const treeNodes = useReactiveVar(treeNodesVar);

  const updateSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSearchResults(
      fuzzySearch(event.target.value, treeNodes, {
        keySelector: (obj) => obj.value.name,
        threshold: 0.8,
        ignoreSymbols: false,
      })
    );
  };

  return (
    <VStack
      spacing={5}
      padding="1rem"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top="0"
      right="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderTop="unset"
      borderRight="unset"
      divider={<StackDivider borderColor={border} />}
    >
      <HStack>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color={border} />}
          />
          <Input
            bg={bg}
            borderColor={border}
            value={inputValue}
            onChange={updateSearchInput}
            placeholder="search for nodes"
          />
        </InputGroup>
      </HStack>
      {inputValue && searchResults?.length && (
        <VStack>
          {searchResults.map((x, i) => (
            <HStack width="100%" key={i}>
              <Text>{x.value.name}</Text>
            </HStack>
          ))}
        </VStack>
      )}
      {inputValue && !searchResults.length && (
        <HStack>
          <Text>No results found.</Text>
        </HStack>
      )}
    </VStack>
  );
};
