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
        (response.data ?? []).map((worker) => {
          const pk = worker.site_worker_id ?? worker.worker_id ?? worker.id;
          return { ...worker, id: pk, site_worker_id: pk };
        }),
      providesTags: ['Worker'],
    }),

    createWorker: builder.mutation({
      query: (data) => ({ url: '/subcontractor-workers', method: 'POST', data }),
      invalidatesTags: ['Worker'],
    }),

    updateWorker: builder.mutation({
      query: ({ worker_id, ...data }) => ({
        url: `/subcontractor-workers/${worker_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Worker'],
    }),

    deleteWorker: builder.mutation({
      query: (worker_id) => ({
        url: `/subcontractor-workers/${worker_id}`,
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
