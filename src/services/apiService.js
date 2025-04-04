import axios from '../axios/axios';

// Función simple para despertar el servidor con una petición ligera
const wakeupServer = () => axios
  .get('/')
  .then(({ data }) => console.log('Servidor despertado', data.message))
  .catch((error) => console.log('Intento de despertar el servidor:', error.message));

const apiService = {
  wakeupServer,
};

export default apiService;
