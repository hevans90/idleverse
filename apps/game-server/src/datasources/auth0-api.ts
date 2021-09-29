import { HTTPDataSource } from 'apollo-datasource-http';
import { Pool } from 'undici';

export class Auth0API extends HTTPDataSource {
  constructor(auth0Url: string, pool: Pool) {
    super(auth0Url, {
      pool,
      clientOptions: {
        bodyTimeout: 5000,
        headersTimeout: 2000,
      },
      requestOptions: {
        headers: {
          'content-type': 'application/json',
          authorization: 'client',
          'cache-control': 'no-cache',
        },
      },
    });
  }

  trySetUserRole = async (id: string, role: string) =>
    this.post(`users/${id}/roles`, { body: { roles: [role] } });
}
