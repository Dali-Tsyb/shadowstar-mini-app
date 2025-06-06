import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAbilitiesService } from "../../services/abilityService";

export const getAbilities = createAsyncThunk("abilities/load", async () => {
   const data = await getAbilitiesService();
   return data;
});

export const abilitySlice = createSlice({
   name: "ability",
   initialState: {
      abilitiesList: [],
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAbilities.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getAbilities.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.abilitiesList = action.payload;
         })
         .addCase(getAbilities.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default abilitySlice.reducer;
