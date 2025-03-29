const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

export const API_URLS = {
  BASE_URL, // Dynamic base URL

  LOGIN: 'http://localhost:5000/api/auth/login',
  LOGOUT: 'http://localhost:5000/api/auth/logout',
  REGISTER: 'http://localhost:5000/api/auth/register',
  ADMIN_LOGIN: 'http://localhost:5000/api/auth/admin/login',
  ADMIN_LOGOUT: 'http://localhost:5000/api/auth/admin/logout',
  VERIFY_TOKEN: 'http://localhost:5000/api/auth/verify-token',
  GET_USER_PROFILE: 'http://localhost:5000/api/user/profile',
  UPDATE_USER_PROFILE: 'http://localhost:5000/api/user/profile/update',
  GET_MEDICAL_HISTORY: 'http://localhost:5000/api/user/medical-history',
  GENERATE_TOKEN: 'http://localhost:5000/api/token/generate',
  REACT_TOKEN: 'http://localhost:5000/api/token/react',
  GET_QUEUE_STATUS: 'http://localhost:5000/api/queue/status',
  UPDATE_QUEUE_STATUS: 'http://localhost:5000/api/queue/status/update'
};
