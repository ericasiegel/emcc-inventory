import axios, { AxiosRequestConfig } from "axios";
import { AddImage } from "../cookieImage/Image";

export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAwMjQ0MzU0LCJpYXQiOjE3MDAxNTc5NTQsImp0aSI6IjU4N2Y3YzZlYzEwOTQ2YzY4NmUwZjVmNTRlN2JiM2MwIiwidXNlcl9pZCI6MX0.iZuAd24d9fkMo6YNvm-tulNsYfCepkPHxfxz65LrlP4'

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
    
    post = (data: T) => {
        return axiosInstance
        .post(this.endpoint, data)
        .then(res => res.data);
    }
    
    patch = (data: T, id: number | string) => {
        return axiosInstance
        .patch(this.endpoint + id + '/', data)
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

    uploadImage = (image: AddImage, slug: string) => {
        return axiosInstance
            .post(this.endpoint + slug + '/images/', image, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
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

}

export default APIClient