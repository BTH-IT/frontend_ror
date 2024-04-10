import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  }
);

export default axiosClient;
