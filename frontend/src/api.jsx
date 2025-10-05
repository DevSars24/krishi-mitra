import axios from "axios";

const API = "http://localhost:8000";

export const registerUser = async (data) => {
  return await axios.post(`${API}/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API}/login`, data);
};
