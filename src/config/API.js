import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://backend-for-react-form-app.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});
