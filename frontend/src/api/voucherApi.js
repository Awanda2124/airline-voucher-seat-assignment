import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getVouchers = async () => {
  const response = await api.get("/vouchers");
  return response.data;
};

export const checkVoucher = async (payload) => {
  const response = await api.post("/check", payload);
  return response.data;
};

export const generateVoucher = async (payload) => {
  const response = await api.post("/generate", payload);
  return response.data;
};

export default api;
