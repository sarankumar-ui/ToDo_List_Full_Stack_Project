import axios from 'axios';


// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'https://todo-list-full-stack-project.onrender.com/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const API = axios.create({
  baseURL: "https://todo-list-full-stack-project.onrender.com/api",
});


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;