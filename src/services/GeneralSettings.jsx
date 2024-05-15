import { useAuth } from '../context/AuthContext';
import useAxiosPrivate from '../hooks/useAxios';
import {
  createLookups
} from '../utils/helpers';

export function useGeneralHelpers() {
  const {setAuth, lookups, setLookups} = useAuth();
  const axiosIntercepted = useAxiosPrivate();

  return {
    // fetchLookups: getAndSetLookups(),
  };

  function getAndSetLookups() {
    return () => {
      if (lookups) return;

      try {
        const URL = USER_ENDPOINTS.GET_LOOKUPS;
        response = axiosIntercepted.get(URL).then(response => {
          const out = createLookups(response.data);
          setLookups(out);
        });
      } catch (err) {
        setAuth(BASE_USER);
      }
    };
  }
}
