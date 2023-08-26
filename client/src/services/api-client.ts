import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMTczNDg1LCJpYXQiOjE2OTMwODcwODUsImp0aSI6IjI4NTgyZDljZmJiMzRlNmE4Zjc1YTU4ZmJlYWFlMDc5IiwidXNlcl9pZCI6MX0.ow_ehglafKPHdVldYZ6qlbb7SoVLLyO-MQjLHGSyiJI'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});