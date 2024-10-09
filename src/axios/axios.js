import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://yo-cruzo-server-t2hf.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;
