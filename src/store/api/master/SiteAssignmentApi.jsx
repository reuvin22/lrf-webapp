import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const siteAssignmentApiSlice = createApi({
  reducerPath: 'siteAssignmentApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['SiteAssignment'],
  endpoints: (builder) => ({

    getSiteAssignments: builder.query({
      query: () => ({ url: '/site-assignment', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        if (items.length > 0) console.log('[SiteAssignmentApi] raw item:', items[0]);
        return items.map((sa) => {
          const pk          = sa.site_assignment_id ?? sa.assignment_id ?? sa.id;
          const siteId      = sa.site_id     ?? sa.site?.site_id     ?? sa.site?.id;
          const employeeId  = sa.employee_id ?? sa.employee?.employee_id ?? sa.employee?.id;
          const employeeName = sa.employee?.name ?? sa.employee?.employee_name ?? sa.employee?.full_name ?? employeeId;
          console.log(pk)
          return {
            ...sa,
            id:                  pk,
            site_assignment_id:  pk,
            site_id:             siteId,
            employee_id:         employeeId,
            site_name:           sa.site?.site_name  ?? siteId,
            employee_name:       employeeName,
          };
        });
      },
      providesTags: ['SiteAssignment'],
    }),

    createSiteAssignment: builder.mutation({
      query: (data) => ({ url: '/site-assignment', method: 'POST', data }),
      invalidatesTags: ['SiteAssignment'],
    }),

    updateSiteAssignment: builder.mutation({
      query: ({ site_assignment_id, ...data }) => ({
        url: `/site-assignment/${site_assignment_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['SiteAssignment'],
    }),

    deleteSiteAssignment: builder.mutation({
      query: (site_assignment_id) => ({
        url: `/site-assignment/${site_assignment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SiteAssignment'],
    }),

  }),
});

export const {
  useGetSiteAssignmentsQuery,
  useCreateSiteAssignmentMutation,
  useUpdateSiteAssignmentMutation,
  useDeleteSiteAssignmentMutation,
} = siteAssignmentApiSlice;
