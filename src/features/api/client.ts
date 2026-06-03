import axios from "axios";
import { API_BASE_URL } from "./url/url";
import { store } from "../../reduxStore/store";

// сделать позже приватный клиент куда не будут вставлятся токен
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});

apiClient.interceptors.request.use((config) =>{
    const token = store.getState().auth.token;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})