import axiosInstance from '@/services';

import type {
  AttemptQuestionsResponse,
  FinishAttemptResponse,
  LeaderboardPeriod,
  LeaderboardResponse,
  ModuleFilter,
  ModulesResponse,
  StartAttemptResponse,
  StudentHomeResponse,
  StudentProfileResponse,
  StudentStatisticsResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
} from '../types/api';

export const burroAPI = {
  getStudentHome: async (): Promise<StudentHomeResponse> => {
    const response = await axiosInstance.get('/student/home');
    return response.data;
  },

  getStudentProfile: async (): Promise<StudentProfileResponse> => {
    const response = await axiosInstance.get('/student/profile');
    return response.data;
  },

  getStudentStatistics: async (): Promise<StudentStatisticsResponse> => {
    const response = await axiosInstance.get('/student/profile/statistics');
    return response.data;
  },

  getModules: async (filter: ModuleFilter = 'all'): Promise<ModulesResponse> => {
    const response = await axiosInstance.get('/modules', { params: { filter } });
    return response.data;
  },

  startAttempt: async (moduleId: string): Promise<StartAttemptResponse> => {
    const response = await axiosInstance.post(`/modules/${moduleId}/start`);
    return response.data;
  },

  restartAttempt: async (moduleId: string): Promise<StartAttemptResponse> => {
    const response = await axiosInstance.post(`/modules/${moduleId}/restart`);
    return response.data;
  },

  getAttemptQuestions: async (attemptId: string): Promise<AttemptQuestionsResponse> => {
    const response = await axiosInstance.get(`/attempts/${attemptId}/questions`);
    return response.data;
  },

  submitAnswer: async (
    attemptId: string,
    payload: SubmitAnswerRequest,
  ): Promise<SubmitAnswerResponse> => {
    const response = await axiosInstance.post(`/attempts/${attemptId}/answer`, payload);
    return response.data;
  },

  finishAttempt: async (attemptId: string): Promise<FinishAttemptResponse> => {
    const response = await axiosInstance.post(`/attempts/${attemptId}/finish`);
    return response.data;
  },

  getLeaderboard: async (period: LeaderboardPeriod): Promise<LeaderboardResponse> => {
    const response = await axiosInstance.get('/leaderboard', { params: { period } });
    return response.data;
  },
};
