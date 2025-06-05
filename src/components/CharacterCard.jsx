import hpIcon from "../assets/images/hp-icon.webp";
import shardIcon from "../assets/images/shard-icon.webp";
import shieldIcon from "../assets/images/shield-icon.webp";
import characterAvatar from "../assets/images/character-avatar.webp";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import binIcon from "../assets/images/bin-icon.svg";

export default function CharacterCard({
   character,
   index,
   setSelectedCharacter,
   selectedCharacter,
}) {
   const { t } = useTranslation();

   //select animation
   const [pulsingIndex, setPulsingIndex] = useState(null);
   //selecting character
   const isSelected = selectedCharacter === character;
   const handleSelect = () => {
      setPulsingIndex(index);
      setSelectedCharacter(character);
      setTimeout(() => setPulsingIndex(null), 600);
   };

   return (
      <div
         className={`blocks-container h-100 w-100 brown-border rounded dark-beige-bg ${
            pulsingIndex === index ? "pulse" : ""
         }`}
         style={{ boxShadow: "0 0 0.5rem #382610" }}
      >
         {/* NAME */}
         <div
            className="grid-area-name brown-border p-2 beige-bg d-flex justify-content-center align-items-center"
            style={{ borderRadius: "0.375rem 0 0 0" }}
         >
            {character.name}
         </div>
         {/* RACE & CLASS */}
         <div
            className="grid-area-class brown-border p-2 brown-bg d-flex flex-column justify-content-center align-items-center gap-1"
            style={{ borderRadius: "0 0.375rem 0 0" }}
         >
            <span className="beige-text text-uppercase text-center fw-bold">
               {t(`races.${character.race_ref.name}`)}
            </span>
            <span
               className="beige-bg"
               style={{ width: "20%", height: "1px" }}
            ></span>
            <span
               className="beige-text text-uppercase text-center fw-bold"
               style={{ opacity: 0.8 }}
            >
               {t(`professions.${character.profession.name}`)}
            </span>
         </div>
         {/* AVATAR */}
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
         {/* CHARACTERISTICS */}
         <div className="grid-area-characteristics brown-border px-2 py-3 beige-bg d-flex flex-column justify-content-between align-items-center">
            <div className="characteristics">
               <span>
                  {character.dexterity > 10 ? "+" : ""}
                  {Math.floor((character.dexterity - 10) / 2)}
               </span>
               <span>ЛВК</span>
            </div>
            <div className="characteristics">
               <span>
                  {character.strength > 10 ? "+" : ""}
                  {Math.floor((character.strength - 10) / 2)}
               </span>
               <span>СИЛ</span>
            </div>
            <div className="characteristics">
               <span>
                  {character.constitution > 10 ? "+" : ""}
                  {Math.floor((character.constitution - 10) / 2)}
               </span>
               <span>ВНС</span>
            </div>
            <div className="characteristics">
               <span>
                  {character.intelligence > 10 ? "+" : ""}
                  {Math.floor((character.intelligence - 10) / 2)}
               </span>
               <span>ИНТ</span>
            </div>
            <div className="characteristics">
               <span>
                  {character.wisdom > 10 ? "+" : ""}
                  {Math.floor((character.wisdom - 10) / 2)}
               </span>
               <span>ХРЗ</span>
            </div>
            <div className="characteristics">
               <span>
                  {character.charisma > 10 ? "+" : ""}
                  {Math.floor((character.charisma - 10) / 2)}
               </span>
               <span>МДР</span>
            </div>
         </div>
         {/* STATS */}
         <div className="d-flex justify-content-between align-items-center grid-area-stats brown-border px-2 py-1 beige-bg">
            <div
               className="stats"
               style={{ backgroundImage: `url(${hpIcon})` }}
            >
               <span className="fw-bold beige-text">{character.hp}</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shardIcon})` }}
            >
               <span className="fw-bold beige-text">{character.shards}</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shieldIcon})` }}
            >
               <span className="fw-bold beige-text">{character.armor}</span>
            </div>
         </div>
         {/* ABILITIES */}
         <button className="grid-area-abilities base-button brown-bg beige-text d-flex align-items-center justify-content-center">
            способности
         </button>
         {/* INVENTORY */}
         <button className="grid-area-inventory base-button brown-bg beige-text d-flex align-items-center justify-content-center">
            инвентарь
         </button>
         {/* SELECT */}
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
         {/* DELETE */}
         <button
            className="grid-area-delete base-button brown-bg"
            style={{ borderRadius: "0 0 0.375rem 0", padding: ".97rem" }}
            data-bs-toggle="modal"
            data-bs-target="#deleteCharacterModal"
         >
            <img src={binIcon} alt="delete" className="w-100" />
         </button>
      </div>
   );
}
