import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getCharactersService = async () => {
   try {
      const response = await axios.get(`${API_URL}/characters/me`);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};
export const addCharacterService = async (data) => {
   try {
      const response = await axios.post(`${API_URL}/characters/`, data);
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const updateCharacterService = async (data) => {
   try {
      const response = await axios.put(
         `${API_URL}/characters/${data.id}`,
         data
      );
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const updateCharacterAvatarService = async (data, player_id) => {
   try {
      const response = await axios.post(`${API_URL}/upload/image/`, {
         file: data.file,
         category: "characters",
         character_id: data.id,
         target_player_id: player_id,
      }, {
         headers: {
            "Content-Type": "multipart/form-data"
         },
      });
      return response.data;
   } catch (error) {
      console.error(error);
      throw error;
   }
};

export const deleteCharacterService = async (id) => {
   try {
      await axios.delete(`${API_URL}/characters/${id}`);
   } catch (error) {
      console.error(error);
      throw error;
   }
};
