const API_URLS = {
  PROD_BASE_URL: String(import.meta.env.VITE_PROD_BASE_URL),
  LOGIN: `${String(import.meta.env.VITE_PROD_BASE_URL)}/${String(
    import.meta.env.VITE_LOGIN_PATIENT_ROUTE
  )}`,
  LOGOUT: `${String(import.meta.env.VITE_PROD_BASE_URL)}/${String(
    import.meta.env.VITE_LOGOUT_PATIENT_ROUTE
  )}`,
  REGISTER: `${String(import.meta.env.VITE_PROD_BASE_URL)}/${String(
    import.meta.env.VITE_REGISTER_PATIENT_ROUTE
  )}`,
  GET_PATIENTS_TOKEN: `${String(import.meta.env.VITE_PROD_BASE_URL)}/${String(
    import.meta.env.VITE_GET_TOKEN_NO
  )}`,
};

export { API_URLS };
