import {API} from '@Constants';

export async function get<T>(endpoint: string): Promise<T> {
  return fetch(API + endpoint, {method: 'GET'}).then(response =>
    response.json(),
  );
}

export async function post<T>(endpoint: string, params: any): Promise<T> {
  return fetch(API + endpoint, {method: 'POST', body: params}).then(response =>
    response.json(),
  );
}

export async function put<T>(endpoint: string, params: any): Promise<T> {
  return fetch(API + endpoint, {method: 'PUT', body: params}).then(response =>
    response.json(),
  );
}

export async function del<T>(endpoint: string, params: any): Promise<T> {
  return fetch(API + endpoint, {method: 'DELETE', body: params}).then(
    response => response.json(),
  );
}
