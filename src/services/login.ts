import { Login } from '@/typing/login';
import request from '@/utils/request';
import { Response } from '@/typing/index';
import { UserInfo } from '@/typing/user';

export async function login(params: Login) {
  return await request.post<Response<UserInfo>>('/api/v1/admin/login', params).then(res => res.data);
}
