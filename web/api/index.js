import axios from "axios";

const baseURL = "http://localhost:8080";

export const getClients = () => axios.get(`${baseURL}/clients`);

export const postClients = (body) => axios.post(`${baseURL}/clients`, body);
export const deleteClient = (id) => axios.delete(`${baseURL}/clients/${id}`);
export const patchClient = (id) => axios.patch(`${baseURL}/clients/${id}`);

export const postLogin = (body) => axios.post(`${baseURL}/login`, body);
export const postRegister = (body) => axios.post(`${baseURL}/register`, body);
