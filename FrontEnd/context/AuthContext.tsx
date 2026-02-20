'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { authApi, profileApi } from '../lib/api';
import { TokenStorage } from '../lib/tokens';
import { TOKEN_KEYS } from '../lib/constants';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load current user on mount
  const loadUser = useCallback(async () => {
    const token = TokenStorage.getAccess();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const profile = await profileApi.get();
      setUser(profile);
    } catch {
      TokenStorage.clear();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const persistSession = useCallback(
    (data: import('../types').AuthResponse) => {
      TokenStorage.setTokens(data.accessToken, data.refreshToken);
      localStorage.setItem(TOKEN_KEYS.SESSION, data.sessionId);
      // Cookies for middleware route protection
      const maxAge = 60 * 60 * 24 * 7;
      document.cookie = `boost_access_token=${data.accessToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
      document.cookie = `boost_user_role=${data.user.role}; path=/; max-age=${maxAge}; SameSite=Lax`;
    },
    [],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await authApi.login(email, password);
      persistSession(data);
      setUser(data.user);
      router.push('/overview');
    },
    [router, persistSession],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const data = await authApi.register(email, password);
      persistSession(data);
      setUser(data.user);
      router.push('/overview');
    },
    [router, persistSession],
  );

  const logout = useCallback(async () => {
    const sessionId = localStorage.getItem(TOKEN_KEYS.SESSION) ?? '';

    try {
      if (sessionId) await authApi.logout(sessionId);
    } catch {
      // ignore logout errors
    } finally {
      TokenStorage.clear();
      // Clear cookies
      document.cookie = 'boost_access_token=; path=/; max-age=0';
      document.cookie = 'boost_user_role=; path=/; max-age=0';
      setUser(null);
      router.push('/login');
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const profile = await profileApi.get();
      setUser(profile);
    } catch {
      // ignore
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
