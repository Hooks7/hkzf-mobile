import axios from 'axios';

let request = axios.create({
	baseURL: process.env.REACT_APP_URL
});

export { request };
