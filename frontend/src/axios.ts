import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:8080`,
});

export default axiosInstance;
