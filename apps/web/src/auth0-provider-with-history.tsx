import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithHistory = (props: {
  domain: string;
  clientId: string;
  children?: JSX.Element;
}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState) =>
    navigate(appState?.returnTo || window.location.pathname);

  return (
    <Auth0Provider
      domain={props.domain}
      clientId={props.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {props?.children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
