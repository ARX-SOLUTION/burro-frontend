import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { authAPI, type AuthUser, canLogin } from '@/modules/auth';
import { userQueryKeys, useUserProfile } from '@/modules/users';

import { tokenStorage } from '@/libs/storage';

type AuthContextType = {
  user: AuthUser | null;
  clearAuth: () => void;
  refreshUser: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();
  const hasToken = tokenStorage.hasValidToken();
  const hasShownAccessDenied = useRef(false);

  const [isInitiatingTelegram, setIsInitiatingTelegram] = useState(
    () => !tokenStorage.hasValidToken() && Boolean(window.Telegram?.WebApp?.initData),
  );

  const { data: profileData, isLoading: isProfileLoading } = useUserProfile();

  useEffect(() => {
    window.Telegram?.WebApp?.ready();
    window.Telegram?.WebApp?.expand();

    if (tokenStorage.hasValidToken()) {
      return;
    }

    const initData = window.Telegram?.WebApp?.initData;
    if (!initData) {
      return;
    }

    authAPI
      .telegramMiniAppLogin(initData)
      .then((data) => {
        tokenStorage.setTokens(data.accessToken, data.refreshToken);
        queryClient.setQueryData(userQueryKeys.profile(), data.user);
      })
      .catch(() => {
        toast.error('Telegram authentication failed. Please try again.');
      })
      .finally(() => {
        setIsInitiatingTelegram(false);
      });
  }, [queryClient]);

  useEffect(() => {
    if (profileData && !canLogin(profileData.role) && !hasShownAccessDenied.current) {
      hasShownAccessDenied.current = true;
      tokenStorage.clearTokens();
      queryClient.setQueryData(userQueryKeys.profile(), null);
      toast.error('Access denied. Please contact an administrator for access.');
    }
  }, [profileData, queryClient]);

  useEffect(() => {
    if (!hasToken) {
      hasShownAccessDenied.current = false;
    }
  }, [hasToken]);

  const user = profileData && canLogin(profileData.role) ? (profileData as AuthUser) : null;

  const clearAuth = useCallback(() => {
    tokenStorage.clearTokens();
    queryClient.setQueryData(userQueryKeys.profile(), null);
    queryClient.removeQueries({ queryKey: userQueryKeys.all });
  }, [queryClient]);

  const refreshUser = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: userQueryKeys.profile() });
  }, [queryClient]);

  const isAuthenticated = !!user && hasToken;
  const isLoading = isInitiatingTelegram || (hasToken && isProfileLoading);

  return (
    <AuthContext.Provider
      value={{
        user,
        clearAuth,
        refreshUser,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
