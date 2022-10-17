import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://test-yo-cruzo-server.onrender.com',

  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;
