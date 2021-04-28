import axios, { AxiosResponse } from 'axios';

interface IApi {
  path: string;
  method: string;
  body: any;
  query: any;
}

export default function api({ path }: IApi): Promise<AxiosResponse<any>> {
  return axios
    .get(path)
    .then(function (resp) {
      return resp.data;
    })
    .catch(function (error) {
      console.error(error);
    });
}
