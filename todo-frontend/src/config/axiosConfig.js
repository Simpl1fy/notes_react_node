import axios from 'axios';

// Set the base URL for your backend API
const api = axios.create({
  baseURL: "https://backend-notes-cp19.onrender.com/"
});

export default api;