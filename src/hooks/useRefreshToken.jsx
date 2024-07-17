import {AUTH_ENDPOINTS, AUTH_SERVICE} from '../services/constants';
import {axiosBase} from '../services';
import { useAuth } from '../context/AuthContext';

const useRefreshToken = () => {
  const {auth, setAuth} = useAuth();

  const refresh = async () => {
    const REFRESH_URL = AUTH_ENDPOINTS.REFRESH_TOKEN;
    const response = await axiosBase.post(REFRESH_URL, {
      authToken: auth.accessToken,
    });
    let newRefreshToken = null;
    try {
      if (!response.data.success || response.data.isReAuthRequired) {
        throw new Error('Log out');
      }
      newRefreshToken = response.data.token;


      setAuth(prev => {
        return {...prev, refreshToken: response.data.token};
      });
    } catch {
      setAuth({});
    }

    return newRefreshToken;
  };
  return refresh;
};

export default useRefreshToken;
