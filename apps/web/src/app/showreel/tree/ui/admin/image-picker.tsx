import { useReactiveVar } from '@apollo/client';
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Fragment, useEffect, useState } from 'react';
import { useUiBackground } from '../../../../hooks/use-ui-background';
import { colorsVar } from '../../../../_state/colors';

type Image = { name: string; imageUrl: string };

export const ImagePicker = ({
  config,
  value,
  onChange,
}: {
  config: Image[];
  value: string;
  onChange?: (imageUrl: string) => void;
}) => {
  const { bg, border } = useUiBackground();
  const { primary } = useReactiveVar(colorsVar);

  const [selected, setSelected] = useState<string>(value);

  useEffect(() => setSelected(value), [value]);

  return (
    <Menu eventListeners={{ scroll: false }} offset={[100, 0]}>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="md"
        borderWidth="1px"
        borderColor={border}
        _hover={{ bg: `${primary}.500` }}
        _expanded={{ bg: `${primary}.700` }}
        _focus={{ boxShadow: 'outline' }}
      >
        <HStack minWidth="200px" justifyContent="center">
          {selected ? (
            <Avatar size="lg" src={selected} />
          ) : (
            <Text>Select an image</Text>
          )}
        </HStack>
      </MenuButton>
      <MenuList bg={bg} borderColor={border}>
        {config.map(({ name, imageUrl }, i) => (
          <Fragment key={i}>
            <MenuItem
              bg={bg}
              onClick={() => {
                setSelected(imageUrl);
                onChange(imageUrl);
              }}
            >
              <HStack
                width="100%"
                minWidth="205px"
                justifyContent="space-between"
              >
                <Text fontSize="xs">{name}</Text>
                <Avatar src={imageUrl} name={name} />
              </HStack>
            </MenuItem>
            {i !== config.length - 1 && <MenuDivider />}
          </Fragment>
        ))}
      </MenuList>
    </Menu>
  );
};
