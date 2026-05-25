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

  unlinkChild: (childId: string) =>
    axiosInstance.delete<{ success: boolean }>(`/parent/children/${childId}`).then((r) => r.data),

  updateChild: (childId: string, data: { fullName?: string }) =>
    axiosInstance
      .patch<{ success: boolean; full_name: string }>(`/parent/children/${childId}`, data)
      .then((r) => r.data),
};
