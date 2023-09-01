import axios from "axios";

export interface FetchResponse<T> {
    count: number;
    results: T[];
  }

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNjc3MDQzLCJpYXQiOjE2OTM1OTA2NDMsImp0aSI6ImUxZTcwNTU1YWU5NDRjN2E5N2Q3ZmZkYWFlYzk3ODMyIiwidXNlcl9pZCI6MX0.q5Hn_LH146J3StDn033FcbOqlyvcrRzcf60ka8Yf81I'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});