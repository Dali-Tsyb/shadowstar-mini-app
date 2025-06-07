import axios from "axios";
import { init } from "i18next";

const API_URL = import.meta.env.VITE_API_URL;

function isTokenValid(token) {
   try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
   } catch (e) {
      console.error(e);
      return false;
   }
}

export async function login() {
   const urlBase = `${API_URL}/auth/telegram`;

   let token = localStorage.getItem("token");

   if (!token || !isTokenValid(token)) {
      try {
         if (window.location.search.includes("hash=")) {
            //query params
            const queryParams = new URLSearchParams(window.location.search);
            const queryString = queryParams.toString();

            const { data } = await axios.post(urlBase, {
               initData: queryString,
            });
            localStorage.setItem("token", data.access_token);
         } else if (window.Telegram?.WebApp?.initData) {
            //Telegram.WebApp.initData
            const { data } = await axios.post(urlBase, {
               initData: window.Telegram.WebApp.initData,
            });
            localStorage.setItem("token", data.access_token);
         } else {
            console.warn("Telegram auth data not found");
         }
      } catch (error) {
         const errMsg =
            error.response?.data?.detail || error.message || "Login failed";
         throw new Error(errMsg);
      }
   }

   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
