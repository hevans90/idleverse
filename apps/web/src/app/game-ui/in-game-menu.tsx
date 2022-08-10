import { useReactiveVar } from '@apollo/client';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  Kbd,
  StackDivider,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { MdMenuBook } from 'react-icons/md';
import { useUiBackground } from '../hooks/use-ui-background';
import {
  responsiveFontProps,
  responsiveIconProps,
} from '../_responsive-utils/font-props';
import { hotkeyHintsVar } from '../_state/global-settings';
import { globalUiVar } from '../_state/global-ui';

type InGameMenuProps = StackProps;

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
      borderStyle="solid"
      borderColor={border}
      alignItems="flex-start"
      width={
        hotkeyHints ? ['110px', '110px', '110px', '110px', '120px'] : '60px'
      }
      divider={<StackDivider borderColor={border} margin="unset !important" />}
      maxHeight="300px"
    >
      <Button
        {...buttonProps}
        onClick={() => {
          globalUiVar({ ...globalUiVar(), questJournalOpen: true });
        }}
      >
        <Icon as={MdMenuBook} {...iconProps} />
        {hotkeyHints && <Kbd {...responsiveFontProps}>J</Kbd>}
      </Button>
      <Button
        {...buttonProps}
        onClick={() => {
          globalUiVar({ ...globalUiVar(), escapeMenuOpen: true });
        }}
      >
        <SettingsIcon {...iconProps} />
        {hotkeyHints && <Kbd {...responsiveFontProps}>Esc</Kbd>}
      </Button>
    </VStack>
  );
};
