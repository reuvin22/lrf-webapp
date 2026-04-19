import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const siteApiSlice = createApi({
  reducerPath: 'siteApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Site'],
  endpoints: (builder) => ({

    getSites: builder.query({
      query: () => ({ url: '/sites', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((site) => {
          const pk = site.site_id ?? site.id;
          return { ...site, id: pk, site_id: pk };
        });
      },
      providesTags: ['Site'],
    }),

    createSites: builder.mutation({
      query: (data) => ({ url: '/sites', method: 'POST', data }),
      invalidatesTags: ['Site'],
    }),

    updateSites: builder.mutation({
      query: ({ site_id, ...data }) => ({
        url: `/sites/${site_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Site'],
    }),

    deleteSites: builder.mutation({
      query: (site_id) => ({
        url: `/sites/${site_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Site'],
    }),

  }),
});

export const {
  useGetSitesQuery,
  useCreateSitesMutation,
  useUpdateSitesMutation,
  useDeleteSitesMutation,
} = siteApiSlice;
