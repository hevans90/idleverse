import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@idleverse/theme';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';

import './index.css';
import reportWebVitals from './reportWebVitals';

const auth = {
  domain: 'dev-uyer-vun.us.auth0.com',
  clientId: 'UMMpI9y0OurEwa9M6lEf5wwG6kFqfj91',
};

export const redirectUri = window.location.origin.includes('localhost')
  ? window.location.origin
  : `${window.location.origin}/idleverse`;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth.domain}
      clientId={auth.clientId}
      redirectUri={redirectUri}
    >
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
