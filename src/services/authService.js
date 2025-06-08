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
/**
 * @param {string} initDataString
 */
export const login = async () => {
   if (
      localStorage.getItem("token") &&
      isTokenValid(localStorage.getItem("token"))
   ) {
      return;
   }
   if (!window.Telegram?.WebApp?.initDataUnsafe) {
      console.error("Telegram WebApp initDataUnsafe не найдено");
      return;
   }
   try {
      const response = await axios.post(
         `${API_URL}/auth/telegram`,
         {
            initData: window.Telegram?.WebApp?.initDataUnsafe,
         },
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );
      localStorage.setItem("token", response.data.access_token);
      axios.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      return response.data;
   } catch (error) {
      console.error("Auth error:", error);
   }
};
