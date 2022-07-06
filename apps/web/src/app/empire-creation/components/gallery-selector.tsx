import {
  Box,
  Button,
  Image,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type GalleryItem = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
};

export type GallerySelectionProps = {
  items: GalleryItem[];
  onSelectionChange: (item: GalleryItem) => void;
  defaultItem?: GalleryItem;
};

const GalleryButton = ({
  item,
  selected,
  onClick,
}: {
  item: GalleryItem;
  selected?: boolean;

  onClick: (item: GalleryItem) => unknown;
}) => {
  return (
    <Box
      as={Button}
      height="125px"
      minWidth={['unset']}
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

export const GallerySelector = ({
  items,
  defaultItem,
  onSelectionChange,
}: GallerySelectionProps) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem>();

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
      paddingRight={[2, 'unset', 'unset', 'unset', 'unset']}
      divider={<StackDivider borderColor="gray.500" />}
    >
      <Stack
        direction={['row', 'column']}
        spacing={2}
        divider={<StackDivider borderColor="gray.500" />}
        paddingLeft={['unset', 3]}
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
      <Box minHeight="450px" minWidth="450px">
        {selectedItem && (
          <>
            <Image
              float="left"
              boxSize="150px"
              src={selectedItem.imageUrl}
              fallbackSrc="/placeholders/150x150.png"
              marginRight={4}
              marginBottom={1}
            />

            <Text fontSize="xxs"> {selectedItem.description}</Text>
          </>
        )}
        {!selectedItem && <Text>Pick a race</Text>}
      </Box>
    </Stack>
  );
};
