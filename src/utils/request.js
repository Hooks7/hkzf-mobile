import axios from 'axios';
import { getToken, removeToken } from './token';

let request = axios.create({
	baseURL: process.env.REACT_APP_URL
});

request.interceptors.request.use((config) => {
	if (getToken()) config.headers.authorization = getToken();
	return config;
});

request.interceptors.response.use((response) => {
	if (response.data.status == 400) removeToken();

	return response;
});

export { request };
