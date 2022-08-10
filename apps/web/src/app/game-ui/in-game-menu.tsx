import { SettingsIcon } from '@chakra-ui/icons';
import {
  Icon,
  IconButton,
  StackDivider,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { MdMenuBook } from 'react-icons/md';
import { useUiBackground } from '../hooks/use-ui-background';
import { globalUiVar } from '../_state/global-ui';

type InGameMenuProps = StackProps;

export const InGameMenu = ({ ...stackProps }: InGameMenuProps) => {
  const { bg, border } = useUiBackground();

  return (
    <VStack
      {...stackProps}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      alignItems="flex-start"
      width={['50px']}
      divider={<StackDivider borderColor={border} margin="unset !important" />}
      maxHeight="300px"
    >
      <IconButton
        borderRadius={0}
        aria-label="Quest Log"
        size="lg"
        icon={<Icon as={MdMenuBook} />}
        onClick={() => {
          //
        }}
      />
      <IconButton
        borderRadius={0}
        aria-label="Quest Log"
        size="lg"
        icon={<SettingsIcon />}
        onClick={() => {
          globalUiVar({ ...globalUiVar(), escapeMenuOpen: true });
        }}
      />
    </VStack>
  );
};
