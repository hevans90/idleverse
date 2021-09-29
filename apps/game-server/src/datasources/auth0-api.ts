import { ChadDataSource } from './chad-data-source';

export class Auth0API extends ChadDataSource {
  constructor(auth0Url: string, auth0Path: string, mgmtToken: string) {
    super(auth0Url, auth0Path, mgmtToken);
  }

  trySetUserRole = async (id: string, role: string) =>
    this.post(`/users/${id}/roles`, { roles: [role] });
}
