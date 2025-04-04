import { useEffect } from 'react';
import apiService from '../services/apiService';

/**
 * Hook para despertar el servidor al iniciar la aplicación
 * @param {boolean} enabled - Habilita o deshabilita el wakeup
 */
const useWakeupServer = (enabled = true) => {
  useEffect(() => {
    if (enabled) {
      console.log('Despertando servidor...');
      apiService.wakeupServer();
    }
  }, [enabled]);
};

export default useWakeupServer;
