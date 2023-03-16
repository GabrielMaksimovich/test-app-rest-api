import { TokenResponse } from '../types/user';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
const currentToken = () => {
  return localStorage.getItem('API_TOKEN') || '';
};

const setCurrentToken = (token: string) => {
  return localStorage.setItem('API_TOKEN', token);
};

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = data;
    options.headers = {
      Token: currentToken(),
    };
  }

  return fetch(BASE_URL + url, options)
    .then(response => {
      if (!response.ok) {
        if (response.status === 401) {
          return fetch(`${BASE_URL}/token`).then(resp => {
            if (resp.ok) {
              return resp.json();
            }

            return {} as TokenResponse;
          })
            .then((respDataObject: TokenResponse) => {
              if (respDataObject.token) {
                setCurrentToken(respDataObject.token);
                // TODO add retry counter not to get into an infinite loop

                return request(url, method, data);
              }

              throw Error('Cannot get token');
            });
        }

        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
};
