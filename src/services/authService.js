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

function filterParams(input) {
   const allowedKeys = ["query_id", "user", "auth_date", "hash"];
   const allowedUserFields = ["id", "first_name", "username"];

   const params = new URLSearchParams(input);
   const filtered = new URLSearchParams();

   for (const key of allowedKeys) {
      if (key === "user" && params.has("user")) {
         try {
            const userRaw = decodeURIComponent(params.get("user"));
            const userObj = JSON.parse(userRaw);

            const cleanedUser = {};
            for (const field of allowedUserFields) {
               if (Object.prototype.hasOwnProperty.call(userObj, field)) {
                  cleanedUser[field] = userObj[field];
               }
            }

            const cleanedUserStr = encodeURIComponent(
               JSON.stringify(cleanedUser)
            );
            filtered.set("user", cleanedUserStr);
         } catch (e) {
            console.error("Failed to parse or clean user field:", e);
         }
      } else if (params.has(key)) {
         filtered.set(key, params.get(key));
      }
   }

   return filtered.toString();
}

/**
 * @param {string} initDataString
 */
export const login = async (initDataString) => {
   if (
      localStorage.getItem("token") &&
      isTokenValid(localStorage.getItem("token"))
   ) {
      return;
   }
   const data = filterParams(initDataString);
   try {
      const response = await axios.post(
         `${API_URL}/auth/telegram`,
         {
            initData: data,
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
