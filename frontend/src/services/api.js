import axios from 'axios';


const API = axios.create({
  baseURL: 
    "https://todo-list-full-stack-project.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});


export default API;