import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { clearLocalStorage, getAccessTokenFromLS, setAccessTokenToLS, setUserToLs } from './getTokenfromLS';
import { AuthResponse } from 'src/types/auth.type';
import { API_URL, path, apiEndpoints } from '../constants/path';

export const http: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    const url = response.config.url;
    
    // Log response for debugging
    console.log('API Response:', {
      url: url,
      data: response.data
    });
    
    // Handle register and login - save token if present
    if (url === apiEndpoints.login || url === apiEndpoints.register) {
      try {
        // Try different response formats
        let access_token = null;
        let user = null;
        
        // Format 1: response.data.data.access_token
        if (response.data?.data?.access_token) {
          access_token = response.data.data.access_token;
          user = response.data.data.user;
        }
        // Format 2: response.data.access_token
        else if (response.data?.access_token) {
          access_token = response.data.access_token;
          user = response.data.user;
        }
        
        if (access_token) {
          setAccessTokenToLS(access_token);
          if (user) {
            setUserToLs(user);
          }
        }
      } catch (e) {
        console.error('Error parsing auth response:', e);
      }
    } else if (url === apiEndpoints.logout) {
      clearLocalStorage();
    }

    return response;
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // Disabled: Let components handle error display instead of global toast
    // if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
    //   toast.error(error.message, {
    //     position: 'top-right',
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'light'
    //   });
    // }

    if (error.response?.status === HttpStatusCode.Unauthorized) {
      clearLocalStorage();
    }

    return Promise.reject(error);
  }
);

//add a request interceptor
http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const access_token = getAccessTokenFromLS();
    if (access_token && config.headers) {
      config.headers.authorization = access_token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
