import { useQuery } from '@tanstack/react-query';

import { parentAPI } from '../api/parentAPI';
import type { ParentChildDetail } from '../types/ParentChild';
import { parentQueryKeys } from './useParentChildren';

export const useParentChildDetail = (childId: string) =>
  useQuery<ParentChildDetail>({
    queryKey: parentQueryKeys.childDetail(childId),
    queryFn: () => parentAPI.getChildDetail(childId),
    enabled: !!childId,
  });
