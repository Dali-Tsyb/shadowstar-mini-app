import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
   addSessionService,
   getSessionsService,
} from "/src/services/sessionService";

export const getSessions = createAsyncThunk("session/load", async () => {
   const data = await getSessionsService();
   return data;
});

export const addSession = createAsyncThunk("session/add", async (data) => {
   const response = await addSessionService(data);
   return response;
});

export const sessionSlice = createSlice({
   name: "session",
   initialState: {
      currentSession: {},
      sessionsList: [],
      status: "idle",
      error: null,
   },
   reducers: {
      setCurrentSession: (state, action) => {
         if (!action.payload) {
            state.currentSession = {};
         } else {
            state.currentSession = action.payload;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getSessions.pending, (state) => {
            state.status = "loading";
         })
         .addCase(getSessions.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.sessionsList = action.payload;
         })
         .addCase(getSessions.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
      builder
         .addCase(addSession.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.sessionsList = [...state.sessionsList, action.payload];
            state.currentSession = action.payload;
         })
         .addCase(addSession.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
         });
   },
});

export const { setCurrentSession } = sessionSlice.actions;

export default sessionSlice.reducer;
