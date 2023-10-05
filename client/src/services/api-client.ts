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

  export interface AddUpdateDough {
    cookie_name: number;
    location_name: number;
    quantity?: number;
  }

  export interface AddUpdateBaked {
    cookie_name: number;
    location_name: number;
    size: string;
    quantity?: number;
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2NjE2MDQyLCJpYXQiOjE2OTY1Mjk2NDIsImp0aSI6IjZmOGJmMDlkYzIyMzRmOTZhMmQwMTJmZDRlMWNkNWQyIiwidXNlcl9pZCI6MX0.-m_8DjCbGqr_DCfF6SR3e-mJxwKEFj8yKMxaVqS-XVE'

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

    addDough = (dough: AddUpdateDough) => {
        return axiosInstance
            .post(this.endpoint, dough)
            .then(res => res.data)
    }
    
    addBaked = (baked: AddUpdateBaked) => {
        return axiosInstance
            .post(this.endpoint, baked)
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