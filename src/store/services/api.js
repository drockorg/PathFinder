import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include', // Enable sending cookies
  }),
  endpoints: (builder) => ({
    testConnection: builder.query({
      query: () => '/test/ping',
    }),
    getAssessmentCategories: builder.query({
      query: () => '/assessments/categories',
    }),
    getAssessment: builder.query({
      query: (id) => `/assessments/${id}`,
    }),
    startAssessment: builder.mutation({
      query: (categoryId) => ({
        url: '/assessments/start',
        method: 'POST',
        body: { categoryId },
      }),
    }),
    submitAssessment: builder.mutation({
      query: ({ assessmentId, answers }) => ({
        url: `/assessments/${assessmentId}/submit`,
        method: 'POST',
        body: { answers },
      }),
    }),
    getAssessmentHistory: builder.query({
      query: () => '/assessments/history',
    }),
    getSkillRecommendations: builder.query({
      query: () => '/assessments/recommendations',
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetAssessmentCategoriesQuery,
  useGetAssessmentQuery,
  useStartAssessmentMutation,
  useSubmitAssessmentMutation,
  useGetAssessmentHistoryQuery,
  useGetSkillRecommendationsQuery,
  useLoginMutation,
  useRegisterMutation,
} = api;