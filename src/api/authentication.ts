import {User} from '@/models/User';
import {get} from './base';

// A mock function to mimic making an async request for data
// export async function login(username: void, password) {
//   return new Promise<{data: User}>(resolve =>
//     setTimeout(() => resolve({data: {id: '1', name: 'John Doe'}}), 500),
//   );
// }

export async function login(username: string, password: string): Promise<User> {
  return get<User>(`/users?username=${username}&password=${password}`);
}
