import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCharacters } from "/src/services/characterService";
import { createCharacter } from "../../services/characterService";

export const loadCharacters = createAsyncThunk("characters/load", async () => {
   const data = await getCharacters();
   return data;
});

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
      addCharacter: async (state, action) => {
         const data = await createCharacter(action.payload);
         state.charactersList = [...state.charactersList, data];
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loadCharacters.pending, (state) => {
            state.status = "loading";
         })
         .addCase(loadCharacters.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.charactersList = action.payload;
         })
         .addCase(loadCharacters.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export const {
   selectCharacter,
   setCharacters,
   addCharacter,
   updateCharacter,
   removeCharacter,
   deleteCharacter,
} = characterSlice.actions;

export default characterSlice.reducer;
