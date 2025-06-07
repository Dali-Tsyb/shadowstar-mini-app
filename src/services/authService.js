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
export const loginService = async (authData, mode = "miniapp") => {
   console.log("auth mode:", mode);

   const endpoint =
      mode === "web"
         ? `${API_URL}/auth/telegram-widget`
         : `${API_URL}/auth/telegram`;
   let response = null;
   try {
      if (mode === "web") {
         const params = new URLSearchParams();
         const fieldsToInclude = [
            "id",
            "first_name",
            "last_name",
            "username",
            "photo_url",
            "auth_date",
            "hash",
         ];

         fieldsToInclude.forEach((field) => {
            if (authData[field] !== null && authData[field] !== undefined) {
               params.append(field, authData[field]);
            }
         });

         response = await axios.get(endpoint, {
            params,
            paramsSerializer: {
               indexes: null,
            },
         });
      } else {
         response = await axios.post(
            endpoint,
            { initData: authData },
            {
               headers: {
                  "X-Telegram-Init-Data": authData,
                  "Content-Type": "application/json",
               },
            }
         );
      }

      const token = response.data.access_token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return token;
   } catch (error) {
      console.error("auth error:", error);
      throw error;
   }
};
