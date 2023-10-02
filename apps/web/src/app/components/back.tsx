import { Box } from '@chakra-ui/react';
import { useUiBackground } from '@idleverse/theme';
import { useNavigate } from 'react-router-dom';

export const Back = () => {
  const { bg, border } = useUiBackground();

  const navigate = useNavigate();

  return (
    <Box
      padding="1rem"
      display="flex"
      flexDirection="column"
      position="absolute"
      alignItems="start"
      bgColor={bg}
      top="0"
      left="0"
      borderWidth="1px"
      borderStyle="solid"
      borderColor={border}
      borderLeft="unset"
      borderTop="unset"
      cursor="pointer"
      zIndex="2"
      onClick={() => navigate(-1)}
    >
      Back
    </Box>
  );
};
