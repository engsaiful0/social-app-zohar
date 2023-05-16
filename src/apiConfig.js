// apiConfig.js

const BASE_URL = 'https://social-dev.cloud/public';
export const API_KEY = '311a5c4915683897f0bea2571aa2eca98398b33beb315b839e4270dff798b098';
export const API_ENDPOINTS = {
  REGISTER: '/users/register',
  AUTHENTICATE: '/users/authenticate',
  VERIFY_OTP: '/users/verify_otp',
  RECOVER: '/users/recover',
  RESETPASSWORD: '/users/setpassword',
  USER_PROFILE: '/users/user_profile',
  PROFILE_UPDATE: '/users/profile_update',
  HASHTAG: '/member/findhastag',
  CREATE_POST: '/member/create_post',
  USER_POST: '/member/user_posts',
};

export const getApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;
