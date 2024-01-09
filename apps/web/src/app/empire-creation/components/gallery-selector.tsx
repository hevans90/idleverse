import { useReactiveVar } from '@apollo/client';
import {
  Box,
  Button,
  Image,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import { colorsVar } from '@idleverse/state';
import { useUiBackground } from '@idleverse/theme';
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
  const { secondary } = useReactiveVar(colorsVar);

  return (
    <Box
      as={Button}
      height={['60px', '125px']}
      minWidth={['30vw', 'unset']}
      lineHeight="inherit"
      whiteSpace="normal"
      isDisabled={selected || false}
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      px="8px"
      borderRadius="3px"
      fontWeight="semibold"
      fontSize={['2xs', 'xs', 'xs', 'sm', 'md']}
      bg={selected ? `${secondary}.600` : 'whiteAlpha.100'}
      color="white.900"
      _hover={!selected && { bg: 'whiteAlpha.300' }}
      _active={{
        bg: `${secondary}.600`,
        transform: 'scale(0.98)',
        borderColor: `${secondary}.700`,
      }}
      _disabled={{
        bg: `${secondary}.600`,
        transform: 'scale(0.98)',
        pointerEvents: 'none',
        opacity: 1,
        _hover: { bg: `${secondary}.600` },
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
  const { bg, border } = useUiBackground();

  const [selectedItem, setSelectedItem] = useState<GalleryItem<T>>();

  useEffect(() => setSelectedItem(defaultItem), [defaultItem]);

  useEffect(
    () => selectedItem && onSelectionChange(selectedItem),
    [onSelectionChange, selectedItem]
  );

  return (
    <Stack
      flexGrow={1}
      bg={bg}
      direction={['column', 'row']}
      spacing={2}
      paddingTop={3}
      paddingBottom={3}
      paddingLeft={[2, 'unset', 'unset', 'unset', 'unset']}
      paddingRight={[2, 1]}
      divider={<StackDivider borderColor={border} />}
    >
      <Stack
        direction={['column']}
        spacing={2}
        divider={<StackDivider borderColor={border} />}
        paddingLeft={['unset', 3]}
        flexGrow={[0, 1]}
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
      <Box
        minHeight="450px"
        flexGrow={3}
        width="auto"
        display={['block', 'block', 'block', 'block', 'flex']}
        flexDir={['row-reverse']}
      >
        {selectedItem && (
          <>
            <Image
              float="left"
              width={['112px', '112px', '224px', '224px', '338px']}
              height={['150px', '150px', '300px', '300px', '450px']}
              src={selectedItem.image_url}
              fallbackSrc="/placeholders/150x150.png"
              marginRight={4}
              marginBottom={1}
              marginLeft={1}
            />

            <Text fontSize="2xs"> {selectedItem.description}</Text>
          </>
        )}
        {!selectedItem && <Text>Pick a {name}</Text>}
      </Box>
    </Stack>
  );
};
