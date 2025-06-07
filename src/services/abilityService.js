import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAbilitiesService = async () => {
   const response = await axios.get(`${API_URL}/abilities`);
   return response.data;
};
