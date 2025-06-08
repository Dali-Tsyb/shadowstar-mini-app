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
export const login = async (initDataString) => {
   console.log("▶️ Отправляем initData на бэкенд:", initDataString);

   if (
      localStorage.getItem("token") &&
      isTokenValid(localStorage.getItem("token"))
   ) {
      return;
   }

   console.log("▶️ [authService] initDataString type:", typeof initDataString);
   console.log("▶️ [authService] initDataString:", initDataString);

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

      const { token } = response.data;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   } catch (error) {
      console.error("Auth error:", error);
   }
};
