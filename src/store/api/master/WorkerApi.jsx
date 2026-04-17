import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const workerApiSlice = createApi({
  reducerPath: 'workerApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Worker'],
  endpoints: (builder) => ({

    getWorkers: builder.query({
      query: () => ({ url: '/subcontractor-workers', method: 'GET' }),
      transformResponse: (response) =>
        (response.data ?? []).map((worker) => ({
          ...worker,
          id: worker.site_worker_id,
        })),
      providesTags: ['Worker'],
    }),

    createWorker: builder.mutation({
      query: (data) => ({ url: '/subcontractor-workers', method: 'POST', data }),
      invalidatesTags: ['Worker'],
    }),

    updateWorker: builder.mutation({
      query: ({ site_worker_id, ...data }) => ({
        url: `/subcontractor-workers/${site_worker_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Worker'],
    }),

    deleteWorker: builder.mutation({
      query: (site_worker_id) => ({
        url: `/subcontractor-workers/${site_worker_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Worker'],
    }),

  }),
});

export const {
  useGetWorkersQuery,
  useCreateWorkerMutation,
  useUpdateWorkerMutation,
  useDeleteWorkerMutation,
} = workerApiSlice;
