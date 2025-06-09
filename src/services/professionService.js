import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProfessionsService = async () => {
   try {
      const response = await axios.get(`${API_URL}/professions`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
