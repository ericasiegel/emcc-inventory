import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMDcxODY3LCJpYXQiOjE2OTI5ODU0NjcsImp0aSI6IjZkMDZmZjUyYmI4YTRlMTlhODFjY2U2YjViNTliNmJiIiwidXNlcl9pZCI6MX0.6RnEtA9rHdD95VEKlO4KrIE56ThVNFZ0Fc8zoiBOlyk'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});