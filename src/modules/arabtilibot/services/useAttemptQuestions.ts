import { useQuery } from '@tanstack/react-query';

import { burroAPI } from '../api/burroAPI';
import { burroQueryKeys } from '../constants/query-keys';

export const useAttemptQuestions = (attemptId: string) => {
  return useQuery({
    queryKey: burroQueryKeys.attempt(attemptId),
    queryFn: () => burroAPI.getAttemptQuestions(attemptId),
    enabled: !!attemptId,
  });
};
