import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

 export interface AddUpdateCookie {
    name: string;
    is_active: boolean;
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NTIyNDk1LCJpYXQiOjE2OTY0MzYwOTUsImp0aSI6IjlhZmYzMzM2MDY4ZTRhZWZhMjA0YmY0NTFjYzg0YTQyIiwidXNlcl9pZCI6MX0.87GhIeZRw0h9aGRFmg9K4_RCXbDZZ_TqnZpt1Vw0dXc'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (config: AxiosRequestConfig) => {
        return axiosInstance
        .get<FetchResponse<T>>(this.endpoint, config)
        .then(res => res.data)
    };

    get = (id: number | string) => {
        return axiosInstance
            .get<T>(this.endpoint + '/' + id)
            .then(res => res.data);
    }

    addCookie = (cookie: AddUpdateCookie) => {
        return axiosInstance
            .post(this.endpoint, cookie)
            .then(res => res.data)
    }

    updateActive = (cookie: AddUpdateCookie, id: number | string) => {
        return axiosInstance
            .patch(this.endpoint + id + '/', cookie)
            .then(res => res.data)
    }

    delete = (id: number | string) => {
        return axiosInstance
            .delete(this.endpoint + '/' + id)
            .then(res => res.data)
            .catch((error) => {
                throw error
            })
    }
}

export default APIClient