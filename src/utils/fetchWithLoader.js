import { useLoader } from "../context/Loader";
 
export const useFetchWithLoader = () => {
  const { setLoading } = useLoader();

  const fetchWithLoader = async (apiCall) => {
    try {
      setLoading(true);
      const data = await apiCall();
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      console.error(error);
      return null;
    }
  };

  return fetchWithLoader;
};
