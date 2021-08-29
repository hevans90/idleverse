import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { themeContraster } from './utils/contrast-calculator';
import { theme } from './_theme/theme';

const contrast = themeContraster(theme);

export const App = () => {
  return (
    <ThemeProvider theme={{ theme, contrast }}>
      <Layout></Layout>
    </ThemeProvider>
  );
};
