const BASE_URL = "https://fosshack2025.onrender.com"; // Change this when deploying

export const API_URLS = {
  //   GET_PATIENTS: `${BASE_URL}/patients`,
  //   GET_PATIENT_BY_ID: (id) => `${BASE_URL}/patients/${id}`,
  //   CREATE_PATIENT: `${BASE_URL}/patients`,
  //   UPDATE_PATIENT: (id) => `${BASE_URL}/patients/${id}`,
  //   DELETE_PATIENT: (id) => `${BASE_URL}/patients/${id}`,

  GET_PATIENTS_TOKEN: `${BASE_URL}/patient/get-token-no`,
  // Authentication routes
  LOGIN: `${BASE_URL}/patient/login`,
  REGISTER: `${BASE_URL}/patient/registration`,
  LOGOUT: `${BASE_URL}/patient/logout`,
};
