import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfessionsService } from "../../services/professionService";

export const getProfessions = createAsyncThunk("professions/load", async () => {
   const data = await getProfessionsService();
   return data;
});

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
         .addCase(getProfessions.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getProfessions.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.professionsList = action.payload;
         })
         .addCase(getProfessions.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default professionSlice.reducer;
