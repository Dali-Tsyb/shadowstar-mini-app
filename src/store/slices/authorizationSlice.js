import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../services/authService";

export const login = createAsyncThunk(
   "user/login",
   async ({ initData, mode }) => {
      console.log("initData:", initData);
      return await loginService(initData, mode);
   }
);

export const authorizationSlice = createSlice({
   name: "authorization",
   initialState: {
      status: "idle",
      error: null,
   },
   reducers: {
      updateAuthStatus: (state, action) => {
         state.status = action.payload;
      },
   },
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

export const { updateAuthStatus } = authorizationSlice.actions;

export default authorizationSlice.reducer;
