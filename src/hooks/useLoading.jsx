import { useLoadingContext } from "../contexts/LoadingContext";

export const useLoading = () => {
  const { setLoading } = useLoadingContext();

  const callApi = async (key, apiFunction, ...args) => {
    setLoading(key, true);
    try {
      const result = await apiFunction(...args);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(key, false);
    }
  };

  return { callApi };
};
