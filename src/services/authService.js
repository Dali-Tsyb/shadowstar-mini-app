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
export const loginService = async (initDataString) => {
   console.log("▶️ Отправляем initData на бэкенд:", initDataString);

   try {
      const response = await axios.post(
         `${API_URL}/auth/telegram`,
         {
            initData: initDataString,
         },
         {
            headers: {
               "X-Telegram-Init-Data": initDataString,
               "Content-Type": "application/json",
            },
         }
      );

      const token = response.data.access_token;
      
      localStorage.setItem("token", token);
   } catch (error) {
      console.error("Auth error:", error);
   }
};
