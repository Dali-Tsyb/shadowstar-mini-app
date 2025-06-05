import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
   getCharactersService,
   addCharacterService,
   deleteCharacterService,
} from "/src/services/characterService";

export const getCharacters = createAsyncThunk("characters/load", async () => {
   const data = await getCharactersService();
   return data;
});

export const addCharacter = createAsyncThunk("characters/add", async (data) => {
   const response = await addCharacterService(data);
   return response;
});

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
         });

      builder
         .addCase(addCharacter.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.charactersList[state.charactersList.length - 1] = action.payload;
         })
         .addCase(addCharacter.rejected, (state, action) => {
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
