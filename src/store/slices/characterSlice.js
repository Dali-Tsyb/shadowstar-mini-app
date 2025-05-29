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
   initialState,
   reducers: {
      selectCharacter: (state, action) => {
         state.selectedCharacter = action.payload;
      },
   },
});

export const { selectCharacter } = characterSlice.actions;

export default characterSlice.reducer;
