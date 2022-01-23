import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import React from 'react';
import { theme } from '../_theme/theme';

export const renderWithChakra = (ui) => {
  const Wrapper = ({ children }) => (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
