import axios from 'axios';

//Create a configured Axios instance
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://todo-list-full-stack-project.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;