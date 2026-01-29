import { AxiosError } from 'axios';

type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    details?: Array<{ field: string; message: string }>;
  };
  message?: string;
};

export const getErrorMessage = (error: unknown, fallback = 'An error occurred'): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    if (data?.error?.message) {
      return data.error.message;
    }
    if (data?.message) {
      return data.message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};

export const getErrorCode = (error: unknown): string | undefined => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.error?.code;
  }
  return undefined;
};

export const getValidationErrors = (error: unknown): Record<string, string> => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    const details = data?.error?.details;
    if (details && Array.isArray(details)) {
      return details.reduce(
        (acc, { field, message }) => {
          acc[field] = message;
          return acc;
        },
        {} as Record<string, string>,
      );
    }
  }
  return {};
};
