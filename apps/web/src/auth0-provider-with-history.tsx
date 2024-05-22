import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const { domain, clientId } = {
  domain: 'dev-uyer-vun.us.auth0.com',
  clientId: 'UMMpI9y0OurEwa9M6lEf5wwG6kFqfj91',
};

const Auth0ProviderWithHistory = (props: { children?: JSX.Element }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) =>
    navigate(appState?.returnTo || window.location.pathname);

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {props?.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
