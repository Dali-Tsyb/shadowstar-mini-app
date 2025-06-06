import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
   try {
      const response = await axios.post(`${API_URL}/auth/telegram`, {
         initData: credentials,
      });
      localStorage.setItem("token", response.data.access_token);
   } catch (error) {
      console.error(error);
   }
};
