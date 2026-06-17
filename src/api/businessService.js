import api from './axios';

export const normalizeBusiness = (business) => ({
  ...business,
  is724: business.openAllDay,
  isFeatured: business.featured,
  image: business.imageUrl,
});

export const getBusinesses = async () => {
  const response = await api.get('/businesses');
  return response.data.map(normalizeBusiness);
};

export const getBusinessBySlug = async (slug) => {
  const response = await api.get(`/businesses/slug/${slug}`);
  return {
    ...response.data,
    business: normalizeBusiness(response.data.business),
  };
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const getSubCategories = async () => {
  const response = await api.get('/sub-categories');
  return response.data;
};

export const getNeighborhoods = async () => {
  const response = await api.get('/neighborhoods');
  return response.data;
};

export const getHomeData = async () => {
  const [businesses, categories, subCategories, neighborhoods] = await Promise.all([
    getBusinesses(),
    getCategories(),
    getSubCategories(),
    getNeighborhoods(),
  ]);

  return { businesses, categories, subCategories, neighborhoods };
};

export const getSubCategoriesByCategory = (subCategories, categoryId) =>
  subCategories.filter((subCategory) => subCategory.parentId === categoryId);
