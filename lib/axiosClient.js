import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'x-client-secret': process.env.NEXT_PUBLIC_CLIENT_SECRET || '',
  },
});

export default axiosClient;
