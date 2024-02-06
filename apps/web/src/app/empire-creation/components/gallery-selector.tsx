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
import { AnimatedText } from '@idleverse/ui';
import { ReactNode } from 'react';

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
  selectedId?: string;
  children?: ReactNode;
  progressingText?: boolean;
  progressingTextDuration?: number;
};

export const GallerySelector = <T,>({
  name,
  items,
  selectedId,
  onSelectionChange,
  children,
  progressingText,
  progressingTextDuration,
}: GallerySelectionProps<T>) => {
  const { bg, border } = useUiBackground();

  const selectedItem = items.find(({ id }) => id === selectedId);

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
            selected={selectedId === item.id}
            onClick={(galleryItem) => onSelectionChange(galleryItem)}
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
        {selectedId && (
          <>
            <Image
              objectFit="cover"
              float="left"
              width={['112px', '112px', '224px', '224px', '338px']}
              height={['150px', '150px', '300px', '300px', '450px']}
              src={selectedItem.image_url}
              fallbackSrc="/placeholders/150x150.png"
              marginRight={4}
              marginBottom={1}
              marginLeft={1}
            />

            {progressingText ? (
              <AnimatedText
                fontSize="2xs"
                content={selectedItem.description}
                duration={
                  progressingTextDuration
                    ? {
                        enter: progressingTextDuration,
                      }
                    : { enter: 1, exit: 2 }
                }
              />
            ) : (
              <Text
                fontSize="2xs"
                whiteSpace="pre-line"
                dangerouslySetInnerHTML={{ __html: selectedItem.description }}
              ></Text>
            )}
          </>
        )}
        {!selectedItem && <Text>Pick a {name}</Text>}
      </Box>

      {children ? <Box>{children}</Box> : null}
    </Stack>
  );
};
