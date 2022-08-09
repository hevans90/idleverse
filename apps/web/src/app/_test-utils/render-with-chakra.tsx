import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@idleverse/theme';
import { render } from '@testing-library/react';

export const renderWithChakra = (ui) => {
  const Wrapper = ({ children }) => (
    <ChakraProvider theme={theme({ primary: 'gray', secondary: 'teal' })}>
      {children}
    </ChakraProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
