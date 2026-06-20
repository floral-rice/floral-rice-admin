import { Login } from '@/typing/login';
import request from '@/utils/request';
import { Response } from '@/typing/index';

export async function login(params: Login) {
  return await request
    .post<
      Response<{
        token: string;
      }>
    >('/api/v1/admin/login', params)
    .then(res => res.data);
}
