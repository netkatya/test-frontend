import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginRequest = async (email: string, password: string) => {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  return data;
};

export const registerRequest = async (email: string, password: string) => {
  const { data } = await axios.post(`${API}/auth/register`, {
    email,
    password,
  });
  return data;
};

export const meRequest = async () => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(`${API}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};
