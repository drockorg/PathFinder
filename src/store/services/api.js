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
    // Profile endpoints
    getProfile: builder.query({
      query: () => '/profile',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    updatePreferences: builder.mutation({
      query: (preferences) => ({
        url: '/profile/preferences',
        method: 'PUT',
        body: preferences,
      }),
      invalidatesTags: ['Profile'],
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: '/profile/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteAvatar: builder.mutation({
      query: () => ({
        url: '/profile/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    addEducation: builder.mutation({
      query: (education) => ({
        url: '/profile/education',
        method: 'POST',
        body: education,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateEducation: builder.mutation({
      query: ({ educationId, ...data }) => ({
        url: `/profile/education/${educationId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteEducation: builder.mutation({
      query: (educationId) => ({
        url: `/profile/education/${educationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    addExperience: builder.mutation({
      query: (experience) => ({
        url: '/profile/experience',
        method: 'POST',
        body: experience,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateExperience: builder.mutation({
      query: ({ experienceId, ...data }) => ({
        url: `/profile/experience/${experienceId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteExperience: builder.mutation({
      query: (experienceId) => ({
        url: `/profile/experience/${experienceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    addSkill: builder.mutation({
      query: (skill) => ({
        url: '/profile/skills',
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Profile'],
    }),
    updateSkill: builder.mutation({
      query: ({ skillId, ...data }) => ({
        url: `/profile/skills/${skillId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteSkill: builder.mutation({
      query: (skillId) => ({
        url: `/profile/skills/${skillId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
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
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePreferencesMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
  useAddEducationMutation,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = api;