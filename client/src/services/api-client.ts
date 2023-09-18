import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTUwNzU2LCJpYXQiOjE2OTUwNjQzNTYsImp0aSI6Ijc5ZmI2YzZlM2NmMzQ4MzM4YWQ4YzU3Zjk2NDA3NGVmIiwidXNlcl9pZCI6MX0.NmNzzw37Cfy_kvoWwKUlKR5YywrU3JSqWMqPx2A55Qk'

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
    }
}

export default APIClient