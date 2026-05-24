let accessToken: string | null = null;
let refreshToken: string | null = null;

export const tokenStorage = {
  getAccessToken: () => accessToken,

  getRefreshToken: () => refreshToken,

  setAccessToken: (token: string | null) => {
    accessToken = token;
  },

  setRefreshToken: (token: string | null) => {
    refreshToken = token;
  },

  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
  },

  clear: () => {
    accessToken = null;
    refreshToken = null;
  },

  hasValidToken: (): boolean => {
    return !!accessToken;
  },
};
