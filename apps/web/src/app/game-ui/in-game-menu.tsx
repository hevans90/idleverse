import { HStack, StackDivider, StackProps } from '@chakra-ui/react';
import { useUiBackground } from '../hooks/use-ui-background';

type InGameMenuProps = StackProps;

export const InGameMenu = ({ ...stackProps }: InGameMenuProps) => {
  const { bg, border } = useUiBackground();

  return (
    <HStack
      {...stackProps}
      bgColor={bg}
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      width="100%"
      alignItems="flex-start"
      divider={<StackDivider borderColor={border} margin="unset !important" />}
      maxHeight="300px"
    ></HStack>
  );
};
