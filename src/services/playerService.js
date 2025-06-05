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
      return [];
   }
};

export const updateRoleService = async (id, role, name) => {
   console.log("service");
   try {
      const response = await axios.put(
         `${API_URL}/players/${id}`,
         { active_as: role, name: name },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
               "Content-Type": "application/json",
            },
         }
      );
      return response.data;
   } catch (error) {
      console.error(error);
      return [];
   }
};
