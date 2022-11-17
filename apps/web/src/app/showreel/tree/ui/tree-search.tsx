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
import { searchResultsVar, treeNodesVar } from '../state/tree.state';

import { search as fuzzySearch } from 'fast-fuzzy';
import { responsiveFontProps } from '../../../_responsive-utils/font-props';

export const TreeSearch = () => {
  const { bg, border } = useUiBackground();

  const [inputValue, setInputValue] = useState<string>('');
  const treeNodes = useReactiveVar(treeNodesVar);
  const searchResults = useReactiveVar(searchResultsVar);

  const updateSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
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
          {searchResults.map((x, i) => (
            <HStack width="100%" key={i} padding={1} alignItems="center">
              <Text {...responsiveFontProps} width="100%">
                {x.value.name}
              </Text>
            </HStack>
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
