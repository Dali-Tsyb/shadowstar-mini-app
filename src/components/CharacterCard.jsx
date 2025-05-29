import hpIcon from "../assets/images/hp-icon.webp";
import shardIcon from "../assets/images/shard-icon.webp";
import shieldIcon from "../assets/images/shield-icon.webp";
import editIcon from "../assets/images/edit-icon.webp";
import characterAvatar from "../assets/images/character-avatar.webp";
import { useState } from "react";

const characters = [
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
];

export default function CharacterCard(props) {
   const [pulsingIndex, setPulsingIndex] = useState(null);

   const handleSelect = () => {
      setPulsingIndex(props.index);
      props.setSelectedCharacter(props.character);
      setTimeout(() => setPulsingIndex(null), 600);
   };

   const isSelected = props.selectedCharacter === props.character;

   return (
      <div
         className={`blocks-container h-100 w-100 brown-border rounded dark-beige-bg ${
            pulsingIndex === props.index ? "pulse" : ""
         }`}
         style={{ boxShadow: "0 0 0.5rem #382610" }}
      >
         <div
            className="grid-area-name brown-border p-2 beige-bg d-flex justify-content-center align-items-center"
            style={{ borderRadius: "0.375rem 0 0 0" }}
         >
            {props.character.name}
         </div>
         <div
            className="grid-area-class brown-border p-2 brown-bg beige-text text-uppercase text-center fw-bold d-flex justify-content-center align-items-center"
            style={{ borderRadius: "0 0.375rem 0 0" }}
         >
            {props.character.class}
         </div>
         <div className="grid-area-avatar brown-border overflow-hidden dark-beige-bg">
            <img
               style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  width: "100%",
               }}
               src={characterAvatar}
               alt="avatar"
            />
         </div>
         <div className="d-flex flex-column justify-content-between align-items-center grid-area-characteristics brown-border px-2 py-3 beige-bg">
            <div className="characteristics">
               <span>+1</span>
               <span>ЛВК</span>
            </div>
            <div className="characteristics">
               <span>-2</span>
               <span>СИЛ</span>
            </div>
            <div className="characteristics">
               <span>-1</span>
               <span>ВНС</span>
            </div>
            <div className="characteristics">
               <span>-2</span>
               <span>ИНТ</span>
            </div>
            <div className="characteristics">
               <span>0</span>
               <span>ХРЗ</span>
            </div>
            <div className="characteristics">
               <span>0</span>
               <span>МДР</span>
            </div>
         </div>
         <div className="d-flex justify-content-between align-items-center grid-area-stats brown-border px-2 py-1 beige-bg">
            <div
               className="stats"
               style={{ backgroundImage: `url(${hpIcon})` }}
            >
               <span className="fw-bold beige-text">17</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shardIcon})` }}
            >
               <span className="fw-bold beige-text">39</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shieldIcon})` }}
            >
               <span className="fw-bold beige-text">29</span>
            </div>
         </div>
         <button className="grid-area-abilities base-button brown-bg beige-text d-flex align-items-center justify-content-center">
            способности
         </button>
         <button className="grid-area-inventory base-button brown-bg beige-text d-flex align-items-center justify-content-center">
            инвентарь
         </button>
         <button
            className={`grid-area-select base-button w-100 ${
               isSelected ? "beige-bg" : "brown-bg"
            }`}
            style={{ borderRadius: "0 0 0 0.375rem" }}
            onClick={handleSelect}
            disabled={isSelected}
         >
            <span
               className={`${isSelected ? "brown-text" : "beige-text"} w-100`}
            >
               {isSelected ? "выбран" : "выбрать персонажа"}
            </span>
         </button>
         <button
            className="grid-area-edit base-button brown-bg beige-text w-100 p-2"
            style={{ borderRadius: "0 0 0.375rem 0" }}
         >
            <img src={editIcon} className="w-100" alt="edit" />
         </button>
      </div>
   );
}
