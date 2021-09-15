import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

export const Auth = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated && user) {
    return (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton></LogoutButton>
      </div>
    );
  } else {
    return <LoginButton></LoginButton>;
  }
};
