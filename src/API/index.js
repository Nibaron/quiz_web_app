import axios from "axios";

export const api = axios.create({
    baseURL: 'https://lws-quiz-api.onrender.com/api'
})