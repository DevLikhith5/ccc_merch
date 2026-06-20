import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function loginUser(email, password) {
  const { data } = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
  return data;
}

export async function registerUser(name, email, password) {
  const { data } = await axios.post(`${BASE_URL}/api/auth/register`, { name, email, password });
  return data;
}

export async function getMe(token) {
  const { data } = await axios.get(`${BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
}
