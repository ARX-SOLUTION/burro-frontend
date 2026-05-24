import { useQuery } from '@tanstack/react-query';

import { parentAPI } from '../api/parentAPI';
import type { ParentChildListItem } from '../types/ParentChild';

export const parentQueryKeys = {
  all: ['parent'] as const,
  children: () => [...parentQueryKeys.all, 'children'] as const,
  childDetail: (id: string) => [...parentQueryKeys.all, 'child', id] as const,
};

export const useParentChildren = () =>
  useQuery<ParentChildListItem[]>({
    queryKey: parentQueryKeys.children(),
    queryFn: parentAPI.getChildren,
  });
