import { queryClient } from '@api/QueryProvider';
import { AuthController } from '@api/auth/controller';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Session, SessionStorage } from './sessionStorage';

type AuthContextData = {
  isAuthenticated: boolean;
  isTryingInitLogin: boolean;
  login: (session: Session) => void;
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

  const intervals = useRef<number[]>([]);

  const performRefreshToken = useCallback(async () => {
    const refreshedSession = await AuthController.get().refreshToken();
    return SessionStorage.get().setSession(refreshedSession);
  }, []);

  const intervalRefreshToken = useCallback(async () => {
    const session = await SessionStorage.get().getSession();
    if (!session) {
      return;
    }

    const delay = (Number(session.expiresIn) - 10) * 1000;
    const interval = setInterval(
      performRefreshToken,
      delay,
    ) as unknown as number;

    intervals.current.push(interval);
  }, [performRefreshToken]);

  const clearIntervals = useCallback(() => {
    while (intervals.current.length) {
      const id = intervals.current.pop();
      clearInterval(id);
    }
  }, [intervals, performRefreshToken]);

  useEffect(() => {
    const onInit = async () => {
      try {
        const initialSession = await SessionStorage.get().getSession();
        if (!initialSession) {
          return;
        }

        await performRefreshToken();

        intervalRefreshToken();

        setIsAuthenticated(true);
      } finally {
        setIsTryingInitLogin(false);
      }
    };

    onInit();

    return () => clearIntervals();
  }, []);

  const login = useCallback(
    async (session: Session) => {
      await SessionStorage.get().setSession(session);

      setIsAuthenticated(true);

      intervalRefreshToken();
    },
    [setIsAuthenticated],
  );

  const logout = useCallback(() => {
    SessionStorage.get().removeSession();

    setIsAuthenticated(false);

    queryClient.clear();

    clearIntervals();
  }, [setIsAuthenticated, clearIntervals]);

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
