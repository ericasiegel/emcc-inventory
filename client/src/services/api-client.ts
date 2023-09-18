import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTUyNTgxLCJpYXQiOjE2OTUwNjYxODEsImp0aSI6ImVkNDAxOTZhOGU2NDQyYmRhMTFiNmM2MmQwZjdmZGY2IiwidXNlcl9pZCI6MX0.vzN9XA-Wl9hEcBpATZeZz1WQK37zszNJvjc49GTn6RA'

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