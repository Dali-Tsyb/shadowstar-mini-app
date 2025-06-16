import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
   getCharactersService,
   addCharacterService,
   updateCharacterService,
   updateCharacterAvatarService,
   deleteCharacterService,
} from "../../services/characterService";

export const getCharacters = createAsyncThunk("characters/load", async () => {
   const data = await getCharactersService();
   return data;
});

export const addCharacter = createAsyncThunk("characters/add", async (data) => {
   const response = await addCharacterService(data);
   return response;
});

export const updateCharacter = createAsyncThunk(
   "characters/update",
   async (data) => {
      const response = await updateCharacterService(data);
      return response;
   }
);

export const updateCharacterAvatar = createAsyncThunk(
   "characters/avatar",
   async (data, { getState }) => {
      const state = getState();
      const player_id = state.player.currentPlayer.id;
      const response = await updateCharacterAvatarService(data, player_id);
      return response;
   }
);

export const deleteCharacter = createAsyncThunk(
   "characters/delete",
   async (id) => {
      await deleteCharacterService(id);
   }
);

export const characterSlice = createSlice({
   name: "character",
   initialState: {
      charactersList: [],
      status: "idle",
      error: null,
      selectedCharacter: null,
   },
   reducers: {
      selectCharacter: (state, action) => {
         state.selectedCharacter = action.payload;
      },
      setCharacters: (state, action) => {
         state.charactersList = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getCharacters.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getCharacters.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.charactersList = action.payload;
         })
         .addCase(getCharacters.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.charactersList = [];
         });

      builder
         .addCase(addCharacter.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.charactersList[state.charactersList.length - 1] =
               action.payload;
         })
         .addCase(addCharacter.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });

      builder
         .addCase(updateCharacter.fulfilled, (state, action) => {
            const updatedIndex = state.charactersList.findIndex(
               (character) => character.id === action.payload.id
            );
            state.charactersList[updatedIndex] = action.payload;
         })
         .addCase(updateCharacter.rejected, (state, action) => {
            state.error = action.error.message;
         });

      builder
         .addCase(updateCharacterAvatar.fulfilled, (state) => {
            state.status = "succeeded";
         })
         .addCase(updateCharacterAvatar.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });

      builder
         .addCase(deleteCharacter.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.charactersList = state.charactersList.filter(
               (character) => character.id !== action.meta.arg
            );
         })
         .addCase(deleteCharacter.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export const { selectCharacter, setCharacters } = characterSlice.actions;

export default characterSlice.reducer;
