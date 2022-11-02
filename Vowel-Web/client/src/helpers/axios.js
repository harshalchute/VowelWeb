import axios from 'axios';
import { api } from '../config';

const axiosInstance = axios.create({
    baseURL: api
});

export default axiosInstance;