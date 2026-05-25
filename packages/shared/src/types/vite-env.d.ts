/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface TelegramWebApp {
  initData: string;
  ready: () => void;
  expand: () => void;
  HapticFeedback?: {
    notificationOccurred: (type: 'success' | 'error' | 'warning') => void;
  };
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}
