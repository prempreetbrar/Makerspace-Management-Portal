import axios, { AxiosInstance } from 'axios';

// The frontend will use its own port unless we manually intercept it and redirect it to the backend.
const axiosInstance = axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:8080`,
}) as AxiosInstance & typeof axios;

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
