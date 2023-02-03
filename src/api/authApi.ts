import axios, { AxiosResponse } from 'axios';
import { axiosClient } from './axiosClient';

export const authApi = {
  register: (params: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    return axiosClient.post('auth/register', params).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
  login: (params: { username: string; password: string }) => {
    return axiosClient.post('auth/login', params).then((res) => {
      return res.data;
    });
  },
  verifyToken: () => {
    return axiosClient.post('auth/verify-token').then((res) => {
      return res.data;
    });
  },
};
