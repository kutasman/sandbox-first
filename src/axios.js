"use strict";

import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const getToken = () => {
    const AUTH_TOKEN = localStorage.getItem('access_token')
    return AUTH_TOKEN ? {
        Authorization: `Bearer ${AUTH_TOKEN}`,
    } : {}
}

axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        config.headers = {
            'Accept': 'application/json',
            ...getToken()
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axios
