import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNTA0NTAxLCJpYXQiOjE2OTM0MTgxMDEsImp0aSI6IjE0ZmQxOTM1ZTc2ZjQ4NzhhZmE5NDg1YmQxNGZjY2Y3IiwidXNlcl9pZCI6MX0.3uQ8wrK-GG-R714qZkdX3WC5AMfFCGawUnNd0acaFhM'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});