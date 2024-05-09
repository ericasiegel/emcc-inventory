import axios, { AxiosRequestConfig } from "axios";
import { AddImage } from "../cookies/Cookie";


export interface FetchResponse<T> {
    count: number; // the number of total items available
    next: string | null; // URL to the next page of items (pagination)
    results: T[]; //Array of items of generic type T
  }

const apiToken = localStorage.getItem('accessToken')
console.log(apiToken);


const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery', // base URL for all API Requests
});

class APIClient<T> {
    endpoint: string; // endpoint associated with the specific API Client instance

    constructor(endpoint: string) {
        this.endpoint = endpoint; // Initialize with a specific API endpoint
    }

    // Method to check of the JWT token has expired based on its expiry time (1 day)
    private isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split('.')[1])) // Decode the JWT payload
        return payload.exp * 1000 < Date.now(); // check if the token expiration time is past the current time
    };

    // Method to prepare and return Axios request configuration with Authorization header
    private getAuthorizedConfig = async (extraConfig: AxiosRequestConfig = {}) => {
        let token = localStorage.getItem('accessToken'); // retrieve the token from local storage
        if (!token || this.isTokenExpired(token)) {
            try {
              token = await this.refreshToken();  // Attempt to refresh the token
            } catch (error) {
              localStorage.removeItem('accessToken');  // Remove invalid tokens
              localStorage.removeItem('refreshToken');
              window.location.reload();  // Force re-login if refresh fails
              throw new Error("Session expired");
            }
          }
        const config: AxiosRequestConfig = {
            headers: {
                ...extraConfig.headers, // merge any existing headers with the Authorizaion header
                Authorization: `Bearer ${token}` // set the authorization header using the token
            },
            ...extraConfig // Include any additional Axios configuration options
        };
        return config; // Return the complete Axios configuration
    }

    // Generic method to handle all API requests
    request = async <U = T>(method: 'get' | 'post' | 'patch' | 'delete', url: string, data?: U, config: AxiosRequestConfig = {}): Promise<FetchResponse<U> | U> => {
        const finalConfig = await this.getAuthorizedConfig(config); // get the authorized config
        if (method === "get" || method === "delete") { // Handle Get and Delete requests that do not requrie a body
            return axiosInstance[method](url, finalConfig).then(res => res.data);
        } else { // handle POST and PATCh requests that may require a body
            return axiosInstance[method](url, data, finalConfig).then(res => res.data);
        }
    }

    // Public methods to access specific API functionalities
    getAll = (config: AxiosRequestConfig = {}) => this.request('get', this.endpoint, null, config); // get all items from an endpoint
    get = (id: number | string) => this.request("get", `${this.endpoint}/${id}`); // get a single item by id
    post = (data: T) => this.request('post', this.endpoint, data); // post new data to an endpoint
    patch = (data: T, id: number | string) => this.request('patch', `${this.endpoint}${id}/`, data); // patch an existing data at an existing id
    delete = (id: number | string) => this.request('delete', `${this.endpoint}/${id}`); // delete data at a specific ID

    // special method for uploading images
     uploadImage = (image: AddImage, id: number) => {
        const formData = new FormData();
        formData.append('image', image.image); // append the image file to FormData
    
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'multipart/form-data', // set the content type for file uploading
            }
        }
        return this.request('patch', `${this.endpoint}/${id}/`, formData, config); // send the request to update the image
    }

    fetchBearerToken = async (username: string, password: string) => {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
            username,
            password,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access); // store the recieved token in local storage
        localStorage.setItem('refreshToken', refresh); // store the recieved token in local storage
        return access; // return the token
    };

    // Method to refresh the access token using the refresh token
    refreshToken = async() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', {
                refresh: refreshToken,
            });
            const { access } = response.data;
            localStorage.setItem('accessToken', access);
            return access;
        } catch (error) {
            console.error("Failed to refresh token: ", error);
            // Optionally clear tokens and force logout here
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.reload();
            throw error;
        }
    }
}

export default APIClient