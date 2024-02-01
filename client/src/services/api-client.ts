import axios, { AxiosRequestConfig } from "axios";
import { AddImage } from "../cookies/Cookie";


export interface FetchResponse<T> {
    count: number;
    next: string | null;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyMDYxNTI4LCJpYXQiOjE3MDE5NzUxMjgsImp0aSI6IjUyOWU3NGE5ZDY1OTRiM2ZiMmI2M2I3MGNmMTEzYWEyIiwidXNlcl9pZCI6MX0.GOHNhipE64AiSImnvpwgUXNCrfra3OZhx61dWj19Yqs'

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

    uploadImage = (image: AddImage, id: number) => {
        const formData = new FormData();
        formData.append('image', image.image);
    
        return axiosInstance
            .patch(this.endpoint + id + '/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res.data)
            .catch((error) => {
                throw error;
            });
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