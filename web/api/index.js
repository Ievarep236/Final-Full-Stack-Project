import axios from "axios";

const baseURL = "http://localhost:8080";

export const getClients = (token) =>
  axios.get(`${baseURL}/clients`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const postClients = (body, token) =>
  axios.post(`${baseURL}/clients`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteClient = (id, token) =>
  axios.delete(`${baseURL}/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const patchClient = (body, id, token) =>
  axios.put(`${baseURL}/clients/${id}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const postLogin = (body) => axios.post(`${baseURL}/login`, body);
export const postRegister = (body) => axios.post(`${baseURL}/register`, body);
