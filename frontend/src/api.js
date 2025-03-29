const BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_DEV_BASE_URL
    : import.meta.env.VITE_PROD_BASE_URL;

const API_URLS = {
  BASE_URL, // Dynamic base URL

  LOGIN: `${BASE_URL}${import.meta.env.VITE_LOGIN_PATIENT_ROUTE}`,
  LOGOUT: `${BASE_URL}${import.meta.env.VITE_LOGOUT_PATIENT_ROUTE}`,
  REGISTER: `${BASE_URL}${import.meta.env.VITE_REGISTER_PATIENT_ROUTE}`,
  GET_PATIENTS_TOKEN: `${BASE_URL}${import.meta.env.VITE_GET_TOKEN_NO}`,
  GET_PATIENTS_MEDICAL_HISTORY: `${BASE_URL}${
    import.meta.env.VITE_GET_MEDICAL_HISTORY
  }`,
  ADMIN_LOGIN: `${BASE_URL}${import.meta.env.VITE_GET_ADMIN}`,
  GOOGLE_MAP_API_KEY: "AIzaSyBHk54pqjcbzFSgvEMNBlLNQoEs00Hp274",
  DEV_SERVER: `${BASE_URL}${import.meta.env.VITE_GET_HOSPITAL_SUGGESTION}`,
};

export { API_URLS };
