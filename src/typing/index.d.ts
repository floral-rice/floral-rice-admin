export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

export interface Menu {
  name: string;
  path?: string;
  children?: Menu[];
  icon?: string;
  authority?: string | string[]
}
