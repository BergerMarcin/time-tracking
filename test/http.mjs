import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  maxContentLength: Infinity
});

export { http };
