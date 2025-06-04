import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRaces } from "../../services/raceService";

export const loadRaces = createAsyncThunk("races/load", async () => {
   const data = await getRaces();
   return data;
});

export const raceSlice = createSlice({
   name: "race",
   initialState: {
      racesList: [],
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loadRaces.pending, (state) => {
            state.status = "loading";
         })
         .addCase(loadRaces.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.racesList = action.payload;
         })
         .addCase(loadRaces.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default raceSlice.reducer;
