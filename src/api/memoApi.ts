import { axiosClient } from './axiosClient';

export const memoApi = {
  create: () => {
    return axiosClient.post('memo').then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
  getAll: () => {
    return axiosClient.get('memo').then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
  getOne: (id: string) => {
    return axiosClient.get(`memo/${id}`).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },

  update: (id: string, params: object) => {
    return axiosClient.put(`memo/${id}`, params).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },

  delete: (id: string) => {
    return axiosClient.delete(`memo/${id}`).then((res) => {
      console.log(res.data);
      return res.data;
    });
  },
};
