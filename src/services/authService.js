import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
   let response;

   if (typeof credentials === "string") {
      response = await axios.post(`${API_URL}/auth/telegram`, {
         initData: credentials,
      });
   } else {
      const query = window.location.search;
      response = await axios.post(`${API_URL}/auth/telegram${query}`);
   }

   localStorage.setItem("token", response.data.access_token);
};
