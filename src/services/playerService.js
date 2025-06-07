import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPlayerService = async () => {
   try {
      const response = await axios.get(`${API_URL}/players/me`, {
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

export const updateRoleService = async (role) => {
   try {
      const response = await axios.post(
         `${API_URL}/players/switch_role?new_role=${role}`,
         {}
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
