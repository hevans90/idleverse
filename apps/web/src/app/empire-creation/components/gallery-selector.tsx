import {
  Box,
  Button,
  Image,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type GalleryItem<T> = {
  id: string;
  name: string;
  description: string;
  image_url?: string;
} & T;

const GalleryButton = <T,>({
  item,
  selected,
  onClick,
}: {
  item: GalleryItem<T>;
  selected?: boolean;

  onClick: (item: GalleryItem<T>) => unknown;
}) => {
  return (
    <Box
      as={Button}
      height="125px"
      minWidth={['30vw', 'unset']}
      maxWidth={['40vw', '30vw', '20vw']}
      lineHeight="inherit"
      whiteSpace="normal"
      disabled={selected || false}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="3px"
      fontWeight="semibold"
      fontSize={['xxs', 'xs', 'xs', 'sm', 'md']}
      bg="whiteAlpha.200"
      color="white.900"
      _hover={!selected && { bg: 'whiteAlpha.300' }}
      _active={{
        bg: 'whiteAlpha.300',
        transform: 'scale(0.98)',
        borderColor: 'teal.700',
      }}
      _disabled={{
        bg: 'teal.600',
        transform: 'scale(0.98)',
        pointerEvents: 'none',
        opacity: 1,
      }}
      paddingInlineStart={4}
      paddingInlineEnd={4}
      onClick={() => onClick(item)}
    >
      {item.name}
    </Box>
  );
};

type GallerySelectionProps<T> = {
  name: string;
  items: GalleryItem<T>[];
  onSelectionChange: (item: GalleryItem<T>) => void;
  defaultItem?: GalleryItem<T>;
};

export const GallerySelector = <T,>({
  name,
  items,
  defaultItem,
  onSelectionChange,
}: GallerySelectionProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem<T>>();

  useEffect(() => setSelectedItem(defaultItem), [defaultItem]);

  useEffect(
    () => selectedItem && onSelectionChange(selectedItem),
    [onSelectionChange, selectedItem]
  );

  return (
    <Stack
      bgColor="gray.600"
      direction={['column', 'row']}
      spacing={2}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={[2, 'unset', 'unset', 'unset', 'unset']}
      paddingRight={[2, 1]}
      divider={<StackDivider borderColor="gray.500" />}
    >
      <Stack
        direction={['row', 'column']}
        spacing={2}
        divider={<StackDivider borderColor="gray.500" />}
        paddingLeft={['unset', 3]}
        flexGrow={1}
        minWidth={['unset', '200px']}
        maxWidth={['unset', '200px']}
      >
        {items.map((item) => (
          <GalleryButton
            key={item.id}
            item={item}
            selected={selectedItem?.id === item.id}
            onClick={(galleryItem) => setSelectedItem(galleryItem)}
          />
        ))}
      </Stack>
      <Box minHeight="450px" flexGrow={3} width="auto">
        {selectedItem && (
          <>
            <Image
              float="left"
              boxSize="150px"
              src={selectedItem.image_url}
              fallbackSrc="/placeholders/150x150.png"
              marginRight={4}
              marginBottom={1}
            />

            <Text fontSize="xxs"> {selectedItem.description}</Text>
          </>
        )}
        {!selectedItem && <Text>Pick a {name}</Text>}
      </Box>
    </Stack>
  );
};
