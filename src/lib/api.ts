import axios from 'axios';

export const api = axios.create({
	baseURL:
		'https://kripos-api-service-c0fnf5cggfc5d9fz.norwayeast-01.azurewebsites.net/api/v1',
	validateStatus: (status: number) => status < 500,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) config.headers.Authorization = `Bearer ${token}`;

	return config;
});
