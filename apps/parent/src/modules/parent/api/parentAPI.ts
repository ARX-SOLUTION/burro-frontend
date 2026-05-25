import axiosInstance from '@burro/shared/services';

import type { ParentChildDetail, ParentChildListItem } from '../types/ParentChild';

export const parentAPI = {
  switchToParent: () =>
    axiosInstance.post<{ role: string; message: string }>('/parent/switch').then((r) => r.data),

  linkChild: (studentId: string) =>
    axiosInstance
      .post<{ success: boolean; child_name: string }>('/parent/link', { studentId })
      .then((r) => r.data),

  getChildren: () =>
    axiosInstance.get<ParentChildListItem[]>('/parent/children').then((r) => r.data),

  getChildDetail: (childId: string) =>
    axiosInstance.get<ParentChildDetail>(`/parent/children/${childId}`).then((r) => r.data),
};
