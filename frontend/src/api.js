const BASE_URL = "http://localhost:4003/api/v1"; // Change this when deploying

export const API_URLS = {
  //   GET_PATIENTS: `${BASE_URL}/patients`,
  //   GET_PATIENT_BY_ID: (id) => `${BASE_URL}/patients/${id}`,
  //   CREATE_PATIENT: `${BASE_URL}/patients`,
  //   UPDATE_PATIENT: (id) => `${BASE_URL}/patients/${id}`,
  //   DELETE_PATIENT: (id) => `${BASE_URL}/patients/${id}`,

  GET_PATIENTS_TOKEN: `${BASE_URL}/patients/get-token-no`,
  // Authentication routes
  LOGIN: `${BASE_URL}/patient/login`,
  REGISTER: `${BASE_URL}/patient/register`,
  LOGOUT: `${BASE_URL}/patient/logout`,
};
