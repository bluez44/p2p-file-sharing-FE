import axios from 'axios';

const instance = axios.create({
//   baseURL: 'http://localhost:8080/api',
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 5000,
});

export default instance;
