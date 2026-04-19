import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category', 'OcrCategory', 'SiteExpenseCategory'],
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => ({ url: '/categories', method: 'GET' }),
      transformResponse: (response) =>
        (response.data ?? []).map((cat) => ({
          ...cat,
          id: cat.category_id,
          category_type: 'expense',
        })),
      providesTags: ['Category'],
    }),

    createCategories: builder.mutation({
      query: (data) => ({ url: '/categories', method: 'POST', data }),
      invalidatesTags: ['Category'],
    }),

    updateCategories: builder.mutation({
      query: ({ category_id, ...data }) => ({
        url: `/categories/${category_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Category'],
    }),

    deleteCategories: builder.mutation({
      query: (category_id) => ({
        url: `/categories/${category_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    getOcrCategories: builder.query({
      query: () => ({ url: '/ocr-categories', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((cat) => {
          const pk   = cat.category_id ?? cat.id;
          const name = cat.category_name ?? cat.name ?? '';
          return { ...cat, id: pk, category_id: pk, category_type: cat.category_type ?? 'ocr', name, category_name: name };
        });
      },
      providesTags: ['OcrCategory'],
    }),

    createOcrCategory: builder.mutation({
      query: (data) => ({ url: '/ocr-categories', method: 'POST', data }),
      invalidatesTags: ['OcrCategory'],
    }),

    updateOcrCategory: builder.mutation({
      query: ({ category_id, ...data }) => ({
        url: `/ocr-categories/${category_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['OcrCategory'],
    }),

    deleteOcrCategory: builder.mutation({
      query: (category_id) => ({
        url: `/ocr-categories/${category_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['OcrCategory'],
    }),

    getSiteExpenseCategories: builder.query({
      query: () => ({ url: '/site-expense-categories', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((cat) => {
          const pk   = cat.site_expense_category_id ?? cat.category_id ?? cat.id;
          const name = cat.category_name ?? cat.name ?? '';
          return { ...cat, id: pk, site_expense_category_id: pk, category_type: cat.category_type ?? 'expense', name, category_name: name };
        });
      },
      providesTags: ['SiteExpenseCategory'],
    }),

    createSiteExpenseCategory: builder.mutation({
      query: (data) => ({ url: '/site-expense-categories', method: 'POST', data }),
      invalidatesTags: ['SiteExpenseCategory'],
    }),

    updateSiteExpenseCategory: builder.mutation({
      query: ({ site_expense_category_id, ...data }) => ({
        url: `/site-expense-categories/${site_expense_category_id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['SiteExpenseCategory'],
    }),

    deleteSiteExpenseCategory: builder.mutation({
      query: (site_expense_category_id) => ({
        url: `/site-expense-categories/${site_expense_category_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SiteExpenseCategory'],
    }),

  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoriesMutation,
  useUpdateCategoriesMutation,
  useDeleteCategoriesMutation,
  useGetOcrCategoriesQuery,
  useCreateOcrCategoryMutation,
  useUpdateOcrCategoryMutation,
  useDeleteOcrCategoryMutation,
  useGetSiteExpenseCategoriesQuery,
  useCreateSiteExpenseCategoryMutation,
  useUpdateSiteExpenseCategoryMutation,
  useDeleteSiteExpenseCategoryMutation,
} = categoryApiSlice;
