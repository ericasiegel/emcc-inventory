import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzNTkwMTk2LCJpYXQiOjE2OTM1MDM3OTYsImp0aSI6ImNhZDNlY2U4NDg4OTRiMTNiMjhlZjNlMjAwMTdlNDFiIiwidXNlcl9pZCI6MX0.Qu-sdmdKuc_3HG7b0s5WyOEwGlgJXDpMV7YQokUExaE'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});