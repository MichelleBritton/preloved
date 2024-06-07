import axios from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

// Export instances to attach interceptors to, one to intercept the request and one for the response
export const axiosReq = axios.create();
export const axiosRes = axios.create();