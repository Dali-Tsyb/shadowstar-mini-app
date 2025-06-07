import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
   let response;

   if (typeof credentials === "string") {
      console.log("body", credentials);
      response = await axios.post(`${API_URL}/auth/telegram`, {
         initData: credentials,
      });
   } else {
      console.log("query", window.location.search);
      const query = window.location.search;
      response = await axios.post(`${API_URL}/auth/telegram${query}`);
   }

   localStorage.setItem("token", response.data.access_token);
};
