import axios from "axios";
import qs from "qs";

const service = axios.create({
    baseURL: '',
    timeout: 10000,
});

service.interceptors.request.use(config => {
    config.method === 'post' ?
        config.data = qs.stringify({
            ...config.data
        }) :
        config.params = {
            ...config.params
        };
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

    return config;
}, error => {
    console.log(error);
    Promise.reject(error)
});


service.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log('error');
        console.log(error);
        console.log(JSON.stringify(error));

        let text = JSON.parse(JSON.stringify(error)).response.status === 404 ?
            '404' :
            '網路異常，請重試';
        console.log(text)
        return Promise.reject(error)
    }
);

export default service;