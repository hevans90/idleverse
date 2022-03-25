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
import { useState } from 'react';

const defaultColors = [
  'gray.500',
  'red.500',
  'orange.500',
  'yellow.500',
  'green.500',
  'teal.500',
  'blue.500',
  'cyan.500',
  'purple.500',
  'pink.500',
];

export const ColorPicker = ({
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
  const [selectedColor, setSelectedColor] = useState<string>(
    defaultColor || colorPalette[0]
  );

  return (
    <Popover
      isOpen={isOpen && !isDisabled}
      onClose={setIsOpen.toggle}
      placement={placement}
    >
      <PopoverTrigger>
        <Button
          bg={selectedColor}
          onClick={setIsOpen.toggle}
          _hover={{ bg: selectedColor, transform: 'scale(1.05)' }}
          _active={{ bg: selectedColor }}
          aria-label="color picker"
          isDisabled={isDisabled}
        ></Button>
      </PopoverTrigger>
      <PopoverContent w="auto" bg={bg} boxShadow="md">
        <PopoverArrow />
        <SimpleGrid columns={5} p={1} spacing={1}>
          {colorPalette.map((color, index) => (
            <Button
              key={index}
              h="40px"
              w="40px"
              p={0}
              minW="40px"
              bg={color}
              _hover={{ bg: color, transform: 'scale(1.05)' }}
              _active={{ bg: color }}
              onClick={() => {
                setIsOpen.toggle();
                setSelectedColor(color);
                onChange(color);
              }}
            />
          ))}
        </SimpleGrid>
      </PopoverContent>
    </Popover>
  );
};
