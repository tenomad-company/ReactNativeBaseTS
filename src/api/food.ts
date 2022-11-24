import {Food} from '@Models/Food';
import {get} from './base';

export async function getFoods(page = 1, limit = 10): Promise<Food[]> {
  return get<Food[]>(`/food?page=${page}&limit=${limit}`);
}
