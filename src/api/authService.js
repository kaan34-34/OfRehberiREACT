import api from './axios';

export const firebaseLogin = async (idToken) => {
  const response = await api.post('/auth/firebase-login', { idToken });
  return response.data;
};
