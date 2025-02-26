const API_URLS = {
  PROD_BASE_URL: import.meta.env.VITE_PROD_BASE_URL, // No need for String()
  LOGIN: `${import.meta.env.VITE_PROD_BASE_URL}${
    import.meta.env.VITE_LOGIN_PATIENT_ROUTE
  }`,
  LOGOUT: `${import.meta.env.VITE_PROD_BASE_URL}${
    import.meta.env.VITE_LOGOUT_PATIENT_ROUTE
  }`,
  REGISTER: `${import.meta.env.VITE_PROD_BASE_URL}${
    import.meta.env.VITE_REGISTER_PATIENT_ROUTE
  }`,
  GET_PATIENTS_TOKEN: `${import.meta.env.VITE_PROD_BASE_URL}${
    import.meta.env.VITE_GET_TOKEN_NO
  }`,
};

export { API_URLS };
