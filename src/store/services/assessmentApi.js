import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const assessmentApi = createApi({
  reducerPath: 'assessmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Assessment', 'History'],
  endpoints: (builder) => ({
    saveProgress: builder.mutation({
      query: (progress) => ({
        url: '/assessment/progress',
        method: 'POST',
        body: progress,
      }),
    }),
    getProgress: builder.query({
      query: (assessmentId) => `/assessment/progress/${assessmentId}`,
    }),
    getDetailedHistory: builder.query({
      query: () => '/assessment/history/detailed',
      providesTags: ['History'],
    }),
    shareAssessment: builder.mutation({
      query: ({ assessmentId, shareData }) => ({
        url: `/assessment/${assessmentId}/share`,
        method: 'POST',
        body: shareData,
      }),
    }),
    generateCertificate: builder.mutation({
      query: (assessmentId) => ({
        url: `/assessment/${assessmentId}/certificate`,
        method: 'POST',
      }),
      transformResponse: (response) => {
        // Convert the PDF data to a blob URL
        const blob = new Blob([response], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
      },
    }),
  }),
});

export const {
  useSaveProgressMutation,
  useGetProgressQuery,
  useGetDetailedHistoryQuery,
  useShareAssessmentMutation,
  useGenerateCertificateMutation,
} = assessmentApi;