import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRacesService } from "../../services/raceService";

export const getRaces = createAsyncThunk("races/load", async () => {
   const data = await getRacesService();
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
         .addCase(getRaces.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getRaces.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.racesList = action.payload;
         })
         .addCase(getRaces.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.racesList = [];
         });
   },
});

export default raceSlice.reducer;
