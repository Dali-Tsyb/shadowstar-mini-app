import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfessions } from "../../services/professionService";

export const loadProfessions = createAsyncThunk(
   "professions/load",
   async () => {
      const data = await getProfessions();
      return data;
   }
);

export const professionSlice = createSlice({
   name: "profession",
   initialState: {
      professionsList: [],
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadProfessions.pending, (state) => {
            state.status = "loading";
         })
         .addCase(loadProfessions.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.professionsList = action.payload;
         })
         .addCase(loadProfessions.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default professionSlice.reducer;
