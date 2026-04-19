import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const ratesApiSlice = createApi({
  reducerPath: 'ratesApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Rate'],
  endpoints: (builder) => ({

    getRates: builder.query({
      query: () => ({ url: '/rates', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((r) => {
          const pk = r.rate_id ?? r.id;
          return { ...r, id: pk, rate_id: pk };
        });
      },
      providesTags: ['Rate'],
    }),

    createRate: builder.mutation({
      query: (data) => ({ url: '/rates', method: 'POST', data }),
      invalidatesTags: ['Rate'],
    }),

    updateRate: builder.mutation({
      query: ({ rate_id, ...data }) => ({
        url: `/rates/${rate_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Rate'],
    }),

    deleteRate: builder.mutation({
      query: (rate_id) => ({
        url: `/rates/${rate_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Rate'],
    }),

  }),
});

export const {
  useGetRatesQuery,
  useCreateRateMutation,
  useUpdateRateMutation,
  useDeleteRateMutation,
} = ratesApiSlice;
