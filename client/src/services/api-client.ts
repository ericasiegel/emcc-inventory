import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NDA1MDI3LCJpYXQiOjE2OTUzMTg2MjcsImp0aSI6ImE5OTBiNDYzNGMzNDRiMDk4NDQ0ZjgwYmJhMGIyZTczIiwidXNlcl9pZCI6MX0.p3m7aHjIewh10v3pzhTmgIU4Cd-b17ocYKke5Tqs6Jg'

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
}

export default APIClient