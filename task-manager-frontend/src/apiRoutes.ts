import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const registerUser = (username: string, password: string) => {
    return axios.post(`${BASE_URL}/auth/register`, {username, password});
}

export const loginUser = (username: string, password: string) => {
    return axios.post(`${BASE_URL}/auth/login`, {username, password});
}

export const createTask = (title: string, description: string, token: string) => {
    return axios.post(`${BASE_URL}/tasks`, {title, description, iscomplete: false}, {
        headers: {Authorization: `Bearer ${token}`}
    });
}

export const getTasks = (token: string) => {
    return axios.get(`${BASE_URL}/tasks`, {
        headers: {Authorization: `Bearer ${token}`}
    });
}

export const updateTask = (id: number, iscomplete: boolean, token: string) => {
    return axios.put(`${BASE_URL}/tasks/${id}`, {iscomplete}, {
        headers: {Authorization: `Bearer ${token}`}
    });
}

export const deleteTask = (id: number, token: string) => {
    return axios.delete(`${BASE_URL}/tasks/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
    });
}