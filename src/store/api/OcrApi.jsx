import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../AxiosBaseQuery';

export const ocrApiSlice = createApi({
  reducerPath: 'ocrApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['OcrUpload'],
  endpoints: (builder) => ({

    getOcrUploads: builder.query({
      query: () => ({ url: '/ocr-uploads', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        return items.map((item) => {
          const pk = item.upload_id ?? item.ocr_upload_id ?? item.id;
          return { ...item, id: pk, upload_id: pk };
        });
      },
      providesTags: ['OcrUpload'],
    }),

    updateOcrUpload: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/ocr-uploads/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['OcrUpload'],
    }),

  }),
});

export const {
  useGetOcrUploadsQuery,
  useUpdateOcrUploadMutation,
} = ocrApiSlice;
