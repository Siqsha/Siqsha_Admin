import { handleApiRequest } from '../../../utils/handleApiRequest';

export const getTerms = async () => {
  const res = await handleApiRequest('GET', '/legal/terms');
  return res?.data || null;
};

export const updateTerms = async (payload) => {
  const res = await handleApiRequest('PUT', '/legal/terms', payload);
  return res?.data;
};
