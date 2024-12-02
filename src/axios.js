import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://46.8.224.61:8222'
});

export default instance;