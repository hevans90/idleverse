/**
 * MIT License
 *
 * Copyright (c) 2021 Sammy Fattah
 *
 * https://github.com/Buupu/chakra-color-picker/blob/main/LICENSE
 */

import {
  Button,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  useBoolean,
} from '@chakra-ui/react';
import { useUiBackground } from '@idleverse/theme';
import { memo, useRef } from 'react';

const defaultColors = [
  'gray.100',
  'gray.200',
  'gray.300',
  'gray.400',
  'gray.500',
  'gray.600',
  'gray.800',
  'gray.900',
  'orange.100',
  'orange.200',
  'orange.300',
  'orange.400',
  'orange.500',
  'orange.600',
  'orange.700',
  'orange.800',
  'red.500',
  'yellow.500',
  'green.500',
  'teal.500',
  'blue.500',
  'cyan.500',
  'purple.500',
  'pink.500',
];

export const ColorPicker = memo(
  ({
    onChange,
    colors,
    defaultColor,
    bg,
    placement,
    isDisabled,
  }: {
    onChange: (value: string) => void;
    colors?: string[];
    defaultColor?: string;
    bg?: string;
    placement?: PlacementWithLogical;
    isDisabled?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useBoolean();
    const colorPalette = colors || defaultColors;
    const selectedColor = useRef<string>(defaultColor || colorPalette[0]);

    const { bg: uiBg, border: uiBorder } = useUiBackground();

    return (
      <Popover
        isOpen={isOpen && !isDisabled}
        onClose={setIsOpen.toggle}
        placement={placement}
      >
        <PopoverTrigger>
          <Button
            h="25px"
            w="25px"
            p={0}
            minW="25px"
            bg={selectedColor.current}
            onClick={setIsOpen.toggle}
            _hover={{ bg: selectedColor.current, transform: 'scale(1.05)' }}
            _active={{ bg: selectedColor.current }}
            aria-label="color picker"
            isDisabled={isDisabled}
          ></Button>
        </PopoverTrigger>
        <PopoverContent
          w="auto"
          bg={uiBg}
          borderWidth="1px"
          borderStyle="solid"
          borderColor={uiBorder}
        >
          <PopoverArrow
            bg={uiBg}
            borderColor={uiBorder}
            borderLeftWidth="1px"
            borderTopWidth="1px"
            boxShadow="unset !important"
            top="-1px !important"
          />
          <SimpleGrid columns={5} p={1} spacing={1}>
            {colorPalette.map((color, index) => (
              <Button
                key={index}
                h="30px"
                w="30px"
                p={0}
                minW="30px"
                bg={color}
                _hover={{ bg: color, transform: 'scale(1.05)' }}
                _active={{ bg: color }}
                onClick={() => {
                  setIsOpen.toggle();
                  selectedColor.current = color;
                  onChange(color);
                }}
              />
            ))}
          </SimpleGrid>
        </PopoverContent>
      </Popover>
    );
  }
);
