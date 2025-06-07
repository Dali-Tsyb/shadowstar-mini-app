import axios from "axios";

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
            // Передаём ровно ту строку, что пришла, без "?"
            const initData = window.location.search.substring(1);

            const { data } = await axios.post(urlBase, { initData });
            localStorage.setItem("token", data.access_token);
         } else if (window.Telegram?.WebApp?.initData) {
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
