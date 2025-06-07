import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
   getPlayerService,
   updateRoleService,
} from "../../services/playerService";

export const getPlayer = createAsyncThunk("player/load", async () => {
   const data = await getPlayerService();
   return data;
});

export const updateRole = createAsyncThunk(
   "player/update",
   async (role, { getState }) => {
      const state = getState();
      const player = state.player.currentPlayer;

      if (!player) throw new Error("Missing player");

      const data = await updateRoleService(role);

      return data;
   }
);

export const playerSlice = createSlice({
   name: "player",
   initialState: {
      currentPlayer: {},
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPlayer.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getPlayer.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.currentPlayer = action.payload;
         })
         .addCase(getPlayer.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
            state.currentPlayer = {};
         });
   },
});

export default playerSlice.reducer;
