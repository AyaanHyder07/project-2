import axios from 'axios';

// Create an Axios instance with a base URL for our backend
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // The base URL of your Spring Boot app
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;