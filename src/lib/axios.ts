import axios from 'axios';

export const apiUrl = "http://localhost:8000/api/v1";
export const S3_URL = "https://8550b56c-0f5c-48cb-9e3f-ff7817b0cfe3.selstorage.ru/";
export const S3_ITEM_TYPE = ".webp";

axios.defaults.withCredentials = true;

// axios.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');
//         if (token) {
//             if (config && config.headers) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//         }
//         return config;
//     },
//     function (err) {
//         return Promise.reject(err);
//     }
// );

export default axios;