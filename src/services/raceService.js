import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRacesService = async () => {
   try {
      const response = await axios.get(`${API_URL}/races/`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
