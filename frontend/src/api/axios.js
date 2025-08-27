import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const instance = axios.create({  
  baseURL: `${apiBaseUrl}/api`,
  withCredentials: true,
  headers: {
    'x-api-key': apiKey,
  },
});

export default instance;
