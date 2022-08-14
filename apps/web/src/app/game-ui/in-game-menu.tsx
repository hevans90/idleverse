import { useReactiveVar } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  HStack,
  Icon,
  IconProps,
  Kbd,
  StackDivider,
  StackProps,
  Text,
  Tooltip,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { GiTalk } from 'react-icons/gi';
import { MdMenuBook } from 'react-icons/md';
import { useUiBackground } from '../hooks/use-ui-background';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../_responsive-utils/font-props';
import { hotkeyHintsVar } from '../_state/global-settings';
import { globalUiVar } from '../_state/global-ui';

type InGameMenuProps = StackProps;

const MenuToolTip = ({
  name,
  kbd,
  children,
}: {
  name: string;
  kbd: string;
  children?: JSX.Element;
}) => {
  const { bgLight } = useUiBackground();

  const color = useColorModeValue('gray.800', 'white');

  return (
    <Tooltip
      placement="right"
      bg={bgLight}
      color={color}
      label={
        <HStack>
          <Text>{name}</Text> <Kbd>{kbd}</Kbd>
        </HStack>
      }
    >
      {children}
    </Tooltip>
  );
};

export const InGameMenu = ({ ...stackProps }: InGameMenuProps) => {
  const { bg, border } = useUiBackground();

  const hotkeyHints = useReactiveVar(hotkeyHintsVar);

  const buttonProps: ButtonProps = {
    height: '60px',
    padding: 2,
    borderRadius: 0,
    width: '100%',
    justifyContent: hotkeyHints ? 'space-between' : 'center',
  };

  const iconProps: IconProps = {
    boxSize: hotkeyHints
      ? (responsiveIconProps.boxSize as number[]).map((x) => x - 1)
      : responsiveIconProps.boxSize,
  };

  return (
    <VStack
      {...stackProps}
      bgColor={bg}
      borderWidth="1px"
      borderLeftWidth={0}
      borderStyle="solid"
      borderColor={border}
      alignItems="flex-start"
      width={
        hotkeyHints ? ['110px', '110px', '110px', '110px', '120px'] : '60px'
      }
      divider={<StackDivider borderColor={border} margin="unset !important" />}
      maxHeight="300px"
    >
      <MenuToolTip name="Quest Journal" kbd="J">
        <Button
          {...buttonProps}
          onClick={() => {
            globalUiVar({ ...globalUiVar(), questJournalOpen: true });
          }}
        >
          <Icon as={MdMenuBook} {...iconProps} />
          {hotkeyHints && <Kbd {...responsiveFontProps}>J</Kbd>}
        </Button>
      </MenuToolTip>
      <MenuToolTip name="NPC Contact" kbd="D">
        <Button
          {...buttonProps}
          onClick={() => {
            globalUiVar({ ...globalUiVar(), npcContactOpen: true });
          }}
        >
          <Icon as={GiTalk} {...iconProps} />
          {hotkeyHints && <Kbd {...responsiveFontProps}>D</Kbd>}
        </Button>
      </MenuToolTip>
      <MenuToolTip name="Settings" kbd="Esc">
        <Button
          {...buttonProps}
          onClick={() => {
            globalUiVar({ ...globalUiVar(), escapeMenuOpen: true });
          }}
        >
          <SettingsIcon {...iconProps} />
          {hotkeyHints && <Kbd {...responsiveFontProps}>Esc</Kbd>}
        </Button>
      </MenuToolTip>
    </VStack>
  );
};
