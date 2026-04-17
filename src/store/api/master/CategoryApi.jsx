import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const categoryApiSlice = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Category', 'OcrCategory'],
  endpoints: (builder) => ({

    // ── Expense Categories (/categories) ──────────────────────────────────
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

    // ── OCR Upload Categories (/ocr-categories) ───────────────────────────
    getOcrCategories: builder.query({
      query: () => ({ url: '/ocr-categories', method: 'GET' }),
      transformResponse: (response) =>
        (response.data ?? []).map((cat) => ({
          ...cat,
          id: cat.category_id,
          category_type: 'ocr',
        })),
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
} = categoryApiSlice;
