import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://45.145.4.182:8222'
});

export default instance;