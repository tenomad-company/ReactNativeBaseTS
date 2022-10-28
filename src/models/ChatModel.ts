import {User} from '@/models/User';
export type ChatModel = {
  message: string;
} & User;
