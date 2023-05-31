import axios from 'axios';
import {API_KEY} from '@env';

console.log(API_KEY);

const cmfChileDB = axios.create({
  baseURL: 'http://api.cmfchile.cl/api-sbifv3/recursos_api',
  params: {
    apikey: API_KEY,
    formato: 'JSON',
  },
});

export default cmfChileDB;
