// import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// export const apiKey = import.meta.env.VITE_API_URL;

// const request: AxiosInstance = axios.create({
//   baseURL: apiKey || "live one test",
// });

// request.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 422) {
//         // console.log('test')
//       } else if (error.response.status === 401) {
//         console.log("error 401", error);
//         //supposed to pass the route to the signin page
//         window.location.href = "/login";
//         localStorage.clear()
//       } else if (error.response.status === 403) {
//         console.log("error 403", error);
//         if (typeof window !== "undefined") {
//           window.location.href = "/";
//         }
//       }
//     } else if (error.request) {
//       console.log(`VITE `);
//     } else {
//       console.log();
//     }
//     return Promise.reject(error);
//   }
// );

// request.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     const token: string | null = localStorage?.getItem("token");
//     // console.log({ token });
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default request;
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

export const apiKey = import.meta.env.VITE_API_URL;

const request: AxiosInstance = axios.create({
  baseURL: apiKey || "live one test",
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 422) {
        // Handle 422 error
      } else if (error.response.status === 401) {
        // Capture current route and pass it to login as a query parameter
        const currentPath = window.location.pathname;
        window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        localStorage.clear();
      } else if (error.response.status === 403) {
        // Handle 403 error
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    } else if (error.request) {
      // Handle request error
    } else {
      // Handle generic error
    }
    return Promise.reject(error);
  }
);

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token: string | null = localStorage?.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
