import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLevelsService } from "../../services/levelService";

export const getLevels = createAsyncThunk("levels/load", async () => {
   const data = await getLevelsService();
   return data;
});

export const levelSlice = createSlice({
   name: "level",
   initialState: {
      levelsList: [],
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getLevels.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getLevels.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.levelsList = action.payload;
         })
         .addCase(getLevels.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.levelsList = [];
         });
   },
});

export default levelSlice.reducer;
