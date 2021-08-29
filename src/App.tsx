import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { themeContraster } from './utils/contrast-calculator';
import { theme } from './_theme/theme';

const contrast = themeContraster(theme);
console.log(theme);
console.log(contrast);

export const App = () => {
  return (
    <ThemeProvider theme={{ theme, contrast }}>
      <Layout></Layout>
    </ThemeProvider>
  );
};
