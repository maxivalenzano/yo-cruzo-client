import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.100.15:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;
