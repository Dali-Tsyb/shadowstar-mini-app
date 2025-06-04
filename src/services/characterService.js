import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCharacters = async () => {
   const response = await axios.get(`${API_URL}/characters/me`, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
};
export const createCharacter = async (data) => {
   const response = await axios.post(`${API_URL}/characters`, data, {
      headers: {
         Authorization: `Bearer ${localStorage.getItem("token")}`,
         "Content-Type": "application/json",
      },
   });
   return response.data;
};
