import {Promotion} from '@/models/Promotion';
import {get} from './base';

export async function getPromotion(page = 1, limit = 10): Promise<Promotion[]> {
  return get<Promotion[]>(`/promotion?page=${page}&limit=${limit}`);
}
