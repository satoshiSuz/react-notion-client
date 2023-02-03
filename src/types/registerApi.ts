import { AxiosHeaders } from 'axios';

export type registerApi = {
  config: {};
  data: { errors: data[] };
  headers: AxiosHeaders;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
};

type data = {
  location: string;
  msg: string;
  param: string;
  value: string;
};
