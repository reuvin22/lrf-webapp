import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const calendarApiSlice = createApi({
  reducerPath: 'calendarApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Calendar', 'DayType'],
  endpoints: (builder) => ({

    getCalendars: builder.query({
      query: () => ({ url: '/company-calendar', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((cal) => {
          const pk = cal.calendar_id ?? cal.id;
          return { ...cal, id: pk, calendar_id: pk };
        });
      },
      providesTags: ['Calendar'],
    }),

    createCalendar: builder.mutation({
      query: (data) => ({ url: '/company-calendar', method: 'POST', data }),
      invalidatesTags: ['Calendar'],
    }),

    updateCalendar: builder.mutation({
      query: ({ calendar_id, ...data }) => ({
        url: `/company-calendar/${calendar_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Calendar'],
    }),

    deleteCalendar: builder.mutation({
      query: (calendar_id) => ({
        url: `/company-calendar/${calendar_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Calendar'],
    }),

    getDayTypes: builder.query({
      query: () => ({ url: '/day-types', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((dt) => {
          const pk = dt.day_type_id ?? dt.id;
          return { ...dt, id: pk, day_type_id: pk };
        });
      },
      providesTags: ['DayType'],
    }),

    createDayType: builder.mutation({
      query: (data) => ({ url: '/day-types', method: 'POST', data }),
      invalidatesTags: ['DayType'],
    }),

    updateDayType: builder.mutation({
      query: ({ day_type_id, ...data }) => ({
        url: `/day-types/${day_type_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['DayType'],
    }),

    deleteDayType: builder.mutation({
      query: (day_type_id) => ({
        url: `/day-types/${day_type_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DayType'],
    }),

  }),
});

export const {
  useGetCalendarsQuery,
  useCreateCalendarMutation,
  useUpdateCalendarMutation,
  useDeleteCalendarMutation,
  useGetDayTypesQuery,
  useCreateDayTypeMutation,
  useUpdateDayTypeMutation,
  useDeleteDayTypeMutation,
} = calendarApiSlice;
