import { Toaster } from 'sonner';

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      duration={4000}
      richColors
      closeButton
      toastOptions={{
        className: 'font-sans',
      }}
    />
  );
};
