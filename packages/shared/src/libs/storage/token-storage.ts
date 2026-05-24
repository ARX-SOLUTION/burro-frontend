const ACCESS_KEY = 'burro_access_token';
const REFRESH_KEY = 'burro_refresh_token';

function loadToken(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveToken(key: string, value: string | null) {
  try {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  } catch {
    // localStorage unavailable
  }
}

let accessToken: string | null = loadToken(ACCESS_KEY);
let refreshToken: string | null = loadToken(REFRESH_KEY);

export const tokenStorage = {
  getAccessToken: () => accessToken,

  getRefreshToken: () => refreshToken,

  setAccessToken: (token: string | null) => {
    accessToken = token;
    saveToken(ACCESS_KEY, token);
  },

  setRefreshToken: (token: string | null) => {
    refreshToken = token;
    saveToken(REFRESH_KEY, token);
  },

  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
    saveToken(ACCESS_KEY, access);
    saveToken(REFRESH_KEY, refresh);
  },

  clearTokens: () => {
    accessToken = null;
    refreshToken = null;
    saveToken(ACCESS_KEY, null);
    saveToken(REFRESH_KEY, null);
  },

  clear: () => {
    accessToken = null;
    refreshToken = null;
    saveToken(ACCESS_KEY, null);
    saveToken(REFRESH_KEY, null);
  },

  hasValidToken: (): boolean => {
    return !!accessToken;
  },
};
