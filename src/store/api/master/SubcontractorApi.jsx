import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const subcontractorApiSlice = createApi({
  reducerPath: 'subcontractorApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Subcontractor'],
  endpoints: (builder) => ({

    getSubcontractors: builder.query({
      query: () => ({ url: '/subcontractors', method: 'GET' }),
      transformResponse: (response) =>
        (response.data ?? []).map((sub) => ({
          ...sub,
          id: sub.site_subcontractor_id,
        })),
      providesTags: ['Subcontractor'],
    }),

    createSubcontractor: builder.mutation({
      query: (data) => ({ url: '/subcontractors', method: 'POST', data }),
      invalidatesTags: ['Subcontractor'],
    }),

    updateSubcontractor: builder.mutation({
      query: ({ site_subcontractor_id, ...data }) => ({
        url: `/subcontractors/${site_subcontractor_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Subcontractor'],
    }),

    deleteSubcontractor: builder.mutation({
      query: (site_subcontractor_id) => ({
        url: `/subcontractors/${site_subcontractor_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Subcontractor'],
    }),

  }),
});

export const {
  useGetSubcontractorsQuery,
  useCreateSubcontractorMutation,
  useUpdateSubcontractorMutation,
  useDeleteSubcontractorMutation,
} = subcontractorApiSlice;
