import { useReactiveVar } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import { theme } from '@idleverse/theme';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { colorsVar } from './app/_state/colors';

import { useEffect } from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';

const auth = {
  domain: 'dev-uyer-vun.us.auth0.com',
  clientId: 'UMMpI9y0OurEwa9M6lEf5wwG6kFqfj91',
};

const AppWithDynamicTheme = () => {
  const { primary, secondary } = useReactiveVar(colorsVar);

  const [currentTheme, setCurrentTheme] = useState<Partial<Theme>>(
    theme({ primary, secondary })
  );

  useEffect(() => {
    setCurrentTheme(theme({ primary, secondary }));
  }, [primary, secondary]);

  return (
    <ChakraProvider theme={currentTheme}>
      <App />
    </ChakraProvider>
  );
};

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <Auth0Provider
      domain={auth.domain}
      clientId={auth.clientId}
      redirectUri={window.location.origin}
    >
      <AppWithDynamicTheme />
    </Auth0Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
