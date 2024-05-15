import {createContext, useContext, useEffect, useState} from 'react';
import {BASE_USER} from '../utlis/constants';
import {retrieveUserSession} from '../utlis/helpers';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState(BASE_USER);
  const [initializing, setInitializing] = useState(true);
  const [lookups, setLookups] = useState();

  useEffect(() => {
    try {
      retrieveUserSession()
        .then(currentUser => {
          if (currentUser) {
            setAuth(currentUser);
          }
        })
        .catch(err => {});
    } catch {
      //do nothing
    } finally {
      setInitializing(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        initializing,
        lookups,
        setLookups,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
