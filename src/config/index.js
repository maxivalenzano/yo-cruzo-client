import Constants from 'expo-constants';

const API_URLS = {
  development: 'http://192.168.0.115:8080/',
  preview: 'https://yo-cruzo-server-t2hf.onrender.com/',
  production: 'https://yo-cruzo-server-t2hf.onrender.com/',
};

const isExpoGo = Constants.appOwnership === 'expo';

let currentEnv = Constants.expoConfig?.extra?.APP_ENV || 'production';

if (isExpoGo) {
  currentEnv = 'development';
}

export const API_URL = API_URLS[currentEnv] || API_URLS.production;

export const APP_THEME = {
  primaryColor: '#F85F6A',
  secondaryColor: '#333',
  lightGray: '#f5f5f5',
  darkGray: '#666',
  errorColor: '#dc3545',
  successColor: '#4CAF50',
  warningColor: '#FFC107',
};
