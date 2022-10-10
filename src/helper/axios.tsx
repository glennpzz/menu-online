import axios from 'axios';

export default axios.create({
  baseURL: `https://menuresto.mocklab.io/api/v1/resto/`,
  headers: {
    'X-AUTH': `sdgt-smd2022`
  }
});

export const dataproduct = '614E645267556B58';