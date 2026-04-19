import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../AxiosBaseQuery';

export const settingsApiSlice = createApi({
  reducerPath: 'settingsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Settings'],
  endpoints: (builder) => ({

    getSettings: builder.query({
      query: () => ({ url: '/settings', method: 'GET' }),
      transformResponse: (response) => {
        const items = Array.isArray(response) ? response : (response.data ?? []);
        const values = {};
        const idMap = {};
        items.forEach((item) => {
          console.log(item)
          const key = item.key ?? item.setting_key ?? item.name;
          const val = item.value ?? item.setting_value;
          const id  = item.system_settings_id;
          if (key) {
            values[key] = val;
            idMap[key]  = id;
          }
        });
        return { values, idMap };
      },
      providesTags: ['Settings'],
    }),

    updateSetting: builder.mutation({
      query: ({ system_settings_id, key, value }) => ({
        url: `/settings/${system_settings_id}`,
        method: 'PUT',
        data: { system_settings_id, key, value },
      }),
      invalidatesTags: ['Settings'],
    }),

  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingMutation,
} = settingsApiSlice;
