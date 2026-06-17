import api from './axios';

export const createBusiness = async (payload) => {
  const response = await api.post('/admin/businesses', payload);
  return response.data;
};

export const updateBusiness = async (businessId, payload) => {
  const response = await api.put(`/admin/businesses/${businessId}`, payload);
  return response.data;
};

export const deleteBusiness = async (businessId) => {
  await api.delete(`/admin/businesses/${businessId}`);
};

export const getAllReviews = async () => {
  const response = await api.get('/admin/reviews');
  return response.data;
};

export const deleteReview = async (reviewId) => {
  await api.delete(`/admin/reviews/${reviewId}`);
};

export const getWaitingQuestions = async () => {
  const response = await api.get('/admin/questions/waiting');
  return response.data;
};

export const answerQuestion = async (questionId, answerText) => {
  const response = await api.patch(`/admin/questions/${questionId}/answer`, { answerText });
  return response.data;
};
