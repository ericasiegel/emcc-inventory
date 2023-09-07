import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk0MTg4NDIzLCJpYXQiOjE2OTQxMDIwMjMsImp0aSI6IjlhYjBmZjBmNDJjMDQxYThhNjI2MmI2ZmQ5ZTFkY2JmIiwidXNlcl9pZCI6MX0.c3_3wJtfYzcgg6YlttJTnKGJLDh2T3YDKXPW5rPpXfc'

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