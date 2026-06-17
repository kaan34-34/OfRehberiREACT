import api from './axios';

export const getBusinessQuestions = async (businessId) => {
  const response = await api.get(`/businesses/${businessId}/questions`);
  return response.data;
};

export const askBusinessQuestion = async (businessId, payload) => {
  const response = await api.post(`/businesses/${businessId}/questions`, payload);
  return response.data;
};
