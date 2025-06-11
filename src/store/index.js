import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices/characterSlice";
import raceReducer from "./slices/raceSlice";
import professionReducer from "./slices/professionSlice";
import playerReducer from "./slices/playerSlice.js";
import sessionReducer from "./slices/sessionSlice.js";
import abilityReducer from "./slices/abilitySlice.js";
import authorizationReducer from "./slices/authorizationSlice.js";
import levelReducer from "./slices/levelSlice.js";

export const store = configureStore({
   reducer: {
      character: characterReducer,
      race: raceReducer,
      profession: professionReducer,
      player: playerReducer,
      session: sessionReducer,
      ability: abilityReducer,
      authorization: authorizationReducer,
      level: levelReducer,
   },
});
