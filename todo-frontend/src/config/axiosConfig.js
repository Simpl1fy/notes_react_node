import axios from 'axios';


// https://backend-notes-cp19.onrender.com/

// Set the base URL for your backend API
const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;