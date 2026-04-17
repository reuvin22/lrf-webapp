import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const employeeApiSlice = createApi({
  reducerPath: 'employeeApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Employee'],
  endpoints: (builder) => ({

    getEmployees: builder.query({
      query: () => ({ url: '/employees', method: 'GET' }),
      transformResponse: (response) =>
        (response.data ?? []).map((emp) => ({ ...emp, id: emp.employee_id })),
      providesTags: ['Employee'],
    }),

    createEmployee: builder.mutation({
      query: (data) => ({ url: '/employees', method: 'POST', data }),
      invalidatesTags: ['Employee'],
    }),

    updateEmployee: builder.mutation({
      query: ({ employee_id, ...data }) => ({
        url: `/employees/${employee_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Employee'],
    }),

    deleteEmployee: builder.mutation({
      query: (employee_id) => ({
        url: `/employees/${employee_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Employee'],
    }),

  }),
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApiSlice;
