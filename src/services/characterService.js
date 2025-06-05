import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCharactersService = async () => {
   try {
      const response = await axios.get(`${API_URL}/characters/me`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error(error);
      return [];
   }
};
export const addCharacterService = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/characters`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error(error);
      return null;
   }
};

export const deleteCharacterService = async (id) => {
   try {
      await axios.delete(`${API_URL}/characters/${id}`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      });
   } catch (error) {
      console.error(error);
      return null;
   }
};
