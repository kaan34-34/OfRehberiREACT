import api from './axios';

export const getUserReviews = async (userId) => {
  const response = await api.get(`/users/${userId}/reviews`);
  return response.data;
};

export const createUserReview = async (userId, businessId, payload) => {
  const response = await api.post(`/users/${userId}/businesses/${businessId}/reviews`, payload);
  return response.data;
};

export const deleteUserReview = async (userId, reviewId) => {
  await api.delete(`/users/${userId}/reviews/${reviewId}`);
};
