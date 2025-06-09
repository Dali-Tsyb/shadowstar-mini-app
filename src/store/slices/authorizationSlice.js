import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../services/authService";

export const login = createAsyncThunk("user/login", async () => {
   const data = await loginService();
   return data;
});

export const authorizationSlice = createSlice({
   name: "authorization",
   initialState: {
      status: "idle",
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.status = "loading";
         })
         .addCase(login.fulfilled, (state) => {
            state.status = "succeeded";
         })
         .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export default authorizationSlice.reducer;
