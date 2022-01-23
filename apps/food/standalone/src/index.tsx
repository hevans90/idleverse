import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { FoodApp } from './app/FoodApp';
import { theme } from './app/_theme/theme';
import './index.css';
import reportWebVitals from './reportWebVitals';

export const redirectUri = window.location.origin.includes('localhost')
  ? window.location.origin
  : `${window.location.origin}/idleverse`;

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <FoodApp />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
