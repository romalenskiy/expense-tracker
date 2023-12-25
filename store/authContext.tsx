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

import { Session, SessionStorage } from './sessionStorage';

type AuthContextData = {
  isAuthenticated: boolean;
  isTryingInitLogin: boolean;
  login: (session: Omit<Session, 'loginTs'>) => void;
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
    const onInit = async () => {
      try {
        const initialSession = await SessionStorage.get().getSession();
        if (!initialSession) {
          return;
        }

        setIsAuthenticated(true);
      } finally {
        setIsTryingInitLogin(false);
      }
    };

    onInit();
  }, []);

  const login: AuthContextData['login'] = useCallback(
    async (session) => {
      await SessionStorage.get().setSession({
        ...session,
        loginTs: Date.now(),
      });

      setIsAuthenticated(true);
    },
    [setIsAuthenticated],
  );

  const logout: AuthContextData['logout'] = useCallback(() => {
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
