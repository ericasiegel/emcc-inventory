import axios from "axios";

// const apiToken = localStorage.getItem('apiToken')
const apiToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzMjY4NjA0LCJpYXQiOjE2OTMxODIyMDQsImp0aSI6IjkyYWFmZjZlMTE4NjQyNTJhYWYyMDZmYjRjYjJhODBkIiwidXNlcl9pZCI6MX0.S2yDhqU4OQwtbTeGuDqp4QBFt-HpelnuEVOIrIVrnAs'

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/bakery',
    headers: {
        Authorization: `Bearer ${apiToken}`
    }
});