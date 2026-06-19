import request from '@/utils/request';
import { Response } from '@/typing/index';
import { User } from '@/typing/user';

export async function getUserInfo() {
  return await request.get<Response<User>>('/api/v1/admin/user.read', ).then(res => res.data);
}
