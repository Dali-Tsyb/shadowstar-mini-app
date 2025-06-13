import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getSessionsService = async () => {
   try {
      const response = await axios.get(`${API_URL}/sessions/`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const addSessionService = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/sessions`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
         },
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
