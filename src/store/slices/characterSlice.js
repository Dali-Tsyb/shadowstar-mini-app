import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   characters: [
      { name: "Крыса Лариса", class: "Зверь" },
      { name: "Пэлиас", class: "Эльф" },
      { name: "Талала", class: "Гном" },
      { name: "Эрик Пэнисов", class: "Гном" },
      { name: "Капучин", class: "Бес" },
      { name: "Миша", class: "Бес" },
      { name: "Дан Балан", class: "Вампир" },
      { name: "Юлиан", class: "Великан" },
      { name: "Вампирбек", class: "Вампир" },
      { name: "Ангелин", class: "Падший ангел" },
   ],
   selectedCharacter: null,
};

export const characterSlice = createSlice({
   name: "character",
   initialState: initialState,
   reducers: {
      selectCharacter: (state, action) => {
         state.selectedCharacter = action.payload;
      },
      setCharacters: (state, action) => {
         state.characters = action.payload;
      },
      addCharacter: (state, action) => {
         state.list.push(action.payload);
      },
      updateCharacter: (state, action) => {
         const index = state.list.findIndex((c) => c.id === action.payload.id);
         if (index !== -1) {
            state.list[index] = action.payload;
         }
      },
      deleteCharacter: (state, action) => {
         state.list = state.list.filter((c) => c.id !== action.payload);
      },
   },
});

export const { selectCharacter } = characterSlice.actions;

export default characterSlice.reducer;
