import { useMutation } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import type { SubmitAnswerRequest } from '../types/api';

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: ({ attemptId, payload }: { attemptId: string; payload: SubmitAnswerRequest }) =>
      burroAPI.submitAnswer(attemptId, payload),
  });
};
