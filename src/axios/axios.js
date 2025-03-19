import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://yo-cruzo-server-pi.vercel.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;
