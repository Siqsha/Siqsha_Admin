import { handleApiRequest } from '../../../utils/handleApiRequest';

// ADMIN: Fetch all ads (no date/active filter)
export const getAllAdsAdmin = async () => {
  return await handleApiRequest('GET', '/admin/all-ads');
};

// ADMIN: Update ad status (approved | rejected | pending)
export const updateAdStatusAdmin = async (adId, status, reason) => {
  const payload = reason !== undefined ? { status, reason } : { status };
  return await handleApiRequest('PUT', `/admin/ad-status/${adId}`, payload);
};

// Fetch single ad (admin can access any)
export const getAdByIdAdmin = async (id) => {
  return await handleApiRequest('GET', `/ad/${id}`);
};

// Update ad content/media
export const updateAdAdmin = async (id, formData) => {
  return await handleApiRequest('PUT', `/ad/${id}`, formData);
};
