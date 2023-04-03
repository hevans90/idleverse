import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithNavigate = (props: {
  domain: string;
  clientId: string;
  children?: JSX.Element;
}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    console.log('pathname', window.location.pathname);
    console.log('NAV', appState?.returnTo || window.location.pathname);
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={props.domain}
      clientId={props.clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {props?.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
