import { createRoot } from 'react-dom/client';

import { useReactiveVar } from '@apollo/client';
import { ChakraProvider, Theme } from '@chakra-ui/react';
import { colorsVar } from '@idleverse/state';
import { theme } from '@idleverse/theme';
import { useEffect, useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { App } from './app/App';
import { routes } from './app/routes';
import Auth0ProviderWithHistory from './auth0-provider-with-history';
import './index.css';
import reportWebVitals from './reportWebVitals';

const RootProviderWrapper = () => {
  const { primary, secondary } = useReactiveVar(colorsVar);

  const [currentTheme, setCurrentTheme] = useState<Partial<Theme>>(
    theme({ primary, secondary })
  );

  useEffect(() => {
    setCurrentTheme(theme({ primary, secondary }));
  }, [primary, secondary]);

  return (
    <ChakraProvider theme={currentTheme}>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </ChakraProvider>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootProviderWrapper />}>
      {routes.map(({ path, component }, i) => (
        <Route key={i} path={path} Component={component} />
      ))}
    </Route>
  )
);

const container = document.getElementById('root');
createRoot(container).render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
