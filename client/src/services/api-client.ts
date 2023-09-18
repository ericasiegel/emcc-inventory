import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1MTQ5MTQ4LCJpYXQiOjE2OTUwNjI3NDgsImp0aSI6ImU4ODk4ZjhkYzliNDRiNDZhYWVkN2Y4NDY0MGY4MDlhIiwidXNlcl9pZCI6MX0.R26Apeq9UO-QZudRH_DgsSd8s-zDasSjLDVQxBeFWFI'

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