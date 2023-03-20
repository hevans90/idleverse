import {
  Box,
  Button,
  Link,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { responsiveFontProps } from '../_responsive-utils/font-props';

const Admin = () => {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      margin="0 1rem 0 1rem"
    >
      <Text fontSize="5xl" textAlign="center" marginBottom="2rem">
        Admin
      </Text>
      <VStack divider={<StackDivider />} spacing={5}>
        <Link as={ReactRouterLink} to="/galaxy-gen">
          <Button {...responsiveFontProps}>Create Galaxies</Button>
        </Link>
        <Link as={ReactRouterLink} to="/tech-tree">
          <Button {...responsiveFontProps}>Tech Tree Editor</Button>
        </Link>
      </VStack>
    </Box>
  );
};
export default Admin;
