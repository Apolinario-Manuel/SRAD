import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/srad',
})

export default api;