import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices/characterSlice";

export const store = configureStore({
   reducer: {
      character: characterReducer,
   },
});
