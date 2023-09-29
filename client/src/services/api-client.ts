import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MDk5MjkzLCJpYXQiOjE2OTYwMTI4OTMsImp0aSI6IjFmMDVjZGQ5NGNmZjQwNzFiYzUzN2ZmMTZiNWRkM2IwIiwidXNlcl9pZCI6MX0.VmZ9BAZWz5FMlLe3s9nbuivHdI5Yq0wKvl6OSFqb4To'

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