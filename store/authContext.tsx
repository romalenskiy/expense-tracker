import { queryClient } from '@api/QueryProvider';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { SessionStorage } from './sessionStorage';

type AuthContextData = {
  isAuthenticated: boolean;
  isTryingInitLogin: boolean;
  login: (token: string, uid: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  isTryingInitLogin: true,
  login: () => undefined,
  logout: () => undefined,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isTryingInitLogin, setIsTryingInitLogin] = useState(true);

  useEffect(() => {
    SessionStorage.get()
      .getSession()
      .then((initialSession) => setIsAuthenticated(!!initialSession))
      .finally(() => setIsTryingInitLogin(false));
  }, []);

  const login = useCallback(
    (token: string, uid: string) => {
      SessionStorage.get().setSession({ idToken: token, uid });

      setIsAuthenticated(true);
    },
    [setIsAuthenticated],
  );

  const logout = useCallback(() => {
    SessionStorage.get().removeSession();

    setIsAuthenticated(false);

    queryClient.clear();
  }, [setIsAuthenticated]);

  const value = useMemo<AuthContextData>(() => {
    return {
      isAuthenticated,
      isTryingInitLogin,
      login,
      logout,
    };
  }, [isAuthenticated, isTryingInitLogin, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
