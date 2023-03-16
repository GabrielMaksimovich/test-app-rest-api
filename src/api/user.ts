import { Response } from '../types/user';
import { client } from './fetchClient';

export const getCards = () => {
  return client.get<Response>('/users');
};
