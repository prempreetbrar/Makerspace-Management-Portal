import axios, {
    AxiosHeaders,
    AxiosInstance,
    InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

// The frontend will use its own port unless we manually intercept it and redirect it to the backend.
const axiosInstance = axios.create({
    baseURL: `http://localhost:8080`,
}) as AxiosInstance & typeof axios;

axiosInstance.defaults.withCredentials = true;

// add an interceptor to include the Authorization header in all requests, that way frontend doesn't have to repeat the same code
// over and over for every request
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = Cookies.get('jwt');

        if (token) {
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            (config.headers as AxiosHeaders).set(
                'Authorization',
                `Bearer ${token}`
            );
        }
        return config;
    },
    (error) => {
        // axios forces us to have some fallback if the interception fails
        return Promise.reject(error);
    }
);

// we still want to be able to use everything else that's on axios.
Object.setPrototypeOf(axiosInstance, axios);

export default axiosInstance;

// got this from the backend. This is a custom error I created. Nothing magical here.
// Have to define it as a class so that TypeScript can compare to it using "instanceof" when
// we're trying to do something with the error.
export class ErrorWithStatusCode extends Error {
    statusCode: number;

    // DON'T USE THIS!!!! This is only here because TypeScript is complaining. The backend
    // already constructed the error using this similar constructor.
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, ErrorWithStatusCode.prototype);
    }
}
