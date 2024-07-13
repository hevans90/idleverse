
import axios, { AxiosRequestConfig } from 'axios';

export class Auth0API {
  async getManagementToken() {
    const options = {
      method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/oauth/token/`,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'client_credentials',
        client_id: process.env.AUTH0_MANAGEMENT_API_CLIENT_ID,
        client_secret: process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      },
    };

    return axios.request(options as AxiosRequestConfig);
  }

  async post(path: string, requestOptions?: any) {
    const {
      data: { access_token },
    } = await this.getManagementToken();

    const options = {
      method: 'POST',
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2` + path,
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${access_token}`,
        'cache-control': 'no-cache',
      },
      data: requestOptions,
    };

    return axios.request(options as AxiosRequestConfig);
  }

  trySetUserRole = async (id: string, role: string) =>
    this.post(`/users/${id}/roles`, { roles: [role] });
}
