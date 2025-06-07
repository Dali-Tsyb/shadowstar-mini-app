import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function login() {
   const urlBase = `${API_URL}/auth/telegram`;

   try {
      if (window.location.search.includes("hash=")) {
         // Если данные пришли через query-параметры
         const queryParams = new URLSearchParams(window.location.search);
         const queryString = queryParams.toString();

         const { data } = await axios.post(`${urlBase}?${queryString}`);
         localStorage.setItem("token", data.access_token);
      } else if (window.Telegram?.WebApp?.initData) {
         // Если данные есть в Telegram.WebApp.initData
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
