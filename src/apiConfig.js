// apiConfig.js

const BASE_URL = 'https://social-dev.cloud/public';
export const API_KEY = '311a5c4915683897f0bea2571aa2eca98398b33beb315b839e4270dff798b098';

export const API_ENDPOINTS = {
  SIGNIN: '/users/signin',
  SIGNUP: '/users/register',
 
  // Add more endpoints as needed
};

export const getApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;
