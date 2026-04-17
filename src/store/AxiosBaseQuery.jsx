import axiosApi from '../api/Axios';

const axiosBaseQuery = () => async ({ url, method = 'GET', data, params }) => {
  try {
    const result = await axiosApi({ url, method, data, params });
    return { data: result.data };
  } catch (err) {
    return {
      error: {
        status: err.response?.status,
        data:   err.response?.data ?? err.message,
      },
    };
  }
};

export default axiosBaseQuery;
