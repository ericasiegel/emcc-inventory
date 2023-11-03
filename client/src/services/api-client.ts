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
  
  export interface AddUpdateStore {
    cookie_name: number;
    size: string;
    quantity?: number;
  }
  export interface EditStore {
    quantity?: number;
  }

  export interface AddImage {
    image: File;
  }
// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5MTIyMTY0LCJpYXQiOjE2OTkwMzU3NjQsImp0aSI6IjdmZjIwZmNmOTBiNjQxNTE4NjU4NmRiOWEwZjUxYmQ5IiwidXNlcl9pZCI6MX0.xTnEMJBAYuLYcQB5_ArQ6tBjYUvw8PU0CP_GIbFy1xk'

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

    uploadImage = (image: AddImage, slug: string) => {
        return axiosInstance
            .post(this.endpoint + slug + '/images/', image, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(res => res.data)
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
    
    addStore = (store: AddUpdateStore) => {
        return axiosInstance
            .post(this.endpoint, store)
            .then(res => res.data)
    }

    editStore = (store: EditStore, id: number | string) => {
        return axiosInstance
            .patch(this.endpoint + id + '/', store)
            .then(res => res.data)
    }

    deleteImage = (slug: string, id: number | string) => {
        return axiosInstance
            .delete(this.endpoint + slug + '/images/' + id)
            .then(res => res.data)
            .catch((error) => {
                throw error
            })
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