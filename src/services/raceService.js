import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getRacesService = async () => {
   const response = await axios.get(`${API_URL}/races`);
   return response.data;
};
