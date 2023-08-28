import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMzM1NjMzLCJpYXQiOjE2OTMyNDkyMzMsImp0aSI6IjYzZjMyM2U5MzM4MDQ4MTFiZjk0ZDA3NTY5N2Q3ZGU5IiwidXNlcl9pZCI6MX0.-bvT_rG0TcEwUFT7IvhA8JzXznIrVlG6OtenHI1QPeY'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});