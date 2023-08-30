import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNDQyODUxLCJpYXQiOjE2OTMzNTY0NTEsImp0aSI6Ijk1ZGRlMWE4YmYzODRlMTNiZTkxODc5MzlhYWQ4ZWE4IiwidXNlcl9pZCI6MX0.h6S54U1qvZ9XH8LUItLV90HIwNycOIV71NBoYbpIVgQ'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});