import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;

export const isTokenValid = (token) => {
   try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
   } catch {
      return false;
   }
};

export const login = async () => {
   if (
      localStorage.getItem("token") &&
      isTokenValid(localStorage.getItem("token"))
   ) {
      return;
   }
   try {
      const response = await axios.post(
         `${API_URL}/login`,
         {
            initData: JSON.stringify(window.Telegram.WebApp.initData),
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      const data = await response.json();
      localStorage.setItem("token", data.access_token);
      axios.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${data.access_token}`;
      return data;
   } catch (error) {
      console.error("Auth error:", error);
   }
};
