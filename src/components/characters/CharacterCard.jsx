import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import hpIcon from "../../assets/images/characters/hp-icon.webp";
import shardIcon from "../../assets/images/characters/shard-icon.webp";
import shieldIcon from "../../assets/images/characters/shield-icon.webp";
import characterAvatar from "../../assets/images/fallbacks/character-avatar.webp";
import binIcon from "../../assets/images/navigation/bin-icon.svg";

export default function CharacterCard({
   character,
   index,
   setSelectedCharacter,
   selectedCharacter,
   updateCharacter,
   updateCharacterAvatar,
}) {
   const { t } = useTranslation();

   //copy character object
   const [name, setName] = useState(character.name);

   //select animation
   const [pulsingIndex, setPulsingIndex] = useState(null);
   //selecting character
   const isSelected = selectedCharacter === character;
   const handleSelect = () => {
      setPulsingIndex(index);
      setSelectedCharacter(character);
      setTimeout(() => setPulsingIndex(null), 600);
   };

   //characteristics swipe logic
   const [showCharsAs, setShowCharsAs] = useState("bonus");
   const touchStartY = useRef(null);

   const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
   };

   const handleTouchEnd = (e) => {
      const endY = e.changedTouches[0].clientY;
      const diffY = touchStartY.current - endY;

      if (diffY > 50) {
         //detected swipe up
         if (showCharsAs === "value") setShowCharsAs("bonus");
         if (showCharsAs === "bonus") setShowCharsAs("value");
      }
   };

   return (
      <div
         className={`blocks-container h-100 w-100 brown-border rounded dark-beige-bg ${
            pulsingIndex === index ? "pulse" : ""
         }`}
      >
         {/* NAME */}
         <div
            className="grid-area-name brown-border p-2 beige-bg d-flex justify-content-center align-items-center"
            style={{ borderRadius: "0.375rem 0 0 0" }}
         >
            <input
               type="text"
               value={name}
               className="p-0 border-0"
               onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, "");
                  input = input.replace(/\s{2,}/g, " ");
                  input = input.trimStart();
                  if (input !== "" && !/[a-zA-Zа-яА-ЯёЁ]/.test(input)) return;

                  setName(input);
               }}
               onBlur={() => {
                  if (name === "") {
                     setName(character.name);
                     return;
                  }

                  updateCharacter({
                     id: character.id,
                     name: name,
                  });
               }}
               onKeyDown={(e) => {
                  if (e.key === "Enter") {
                     e.target.blur();
                  }
               }}
            />
         </div>
         {/* RACE & CLASS */}
         <div
            className="grid-area-class brown-border p-2 brown-bg d-flex flex-column justify-content-center align-items-center gap-1"
            style={{ borderRadius: "0 0.375rem 0 0" }}
         >
            <span
               className="beige-text text-uppercase text-center fw-bold "
               style={{ wordBreak: "break-all" }}
            >
               {t(`races.${character.race.name}`)}
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
            <label htmlFor={`avatar-${character.id}`} className="w-100 h-100">
               <img
                  style={{
                     minWidth: "100%",
                     minHeight: "100%",
                     objectFit: "cover",
                     objectPosition: "center",
                     display: "block",
                     width: "100%",
                     cursor: "pointer",
                  }}
                  src={
                     character.image_url === null
                        ? characterAvatar
                        : import.meta.env.VITE_API_URL.replace("/api", "") +
                          character.image_url
                  }
                  alt="avatar"
               />
               <input
                  type="file"
                  id={`avatar-${character.id}`}
                  accept="image/png, image/jpeg, image/gif"
                  style={{ display: "none" }}
                  onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (!file) return;
                     console.log(
                        "Uploading avatar for character id:",
                        character.id,
                        character.name
                     );

                     updateCharacterAvatar({
                        id: character.id,
                        file: file,
                     });
                  }}
               />
            </label>
         </div>

         {/* CHARACTERISTICS */}
         <div
            className="grid-area-characteristics brown-border px-2 py-3 beige-bg d-flex flex-column justify-content-between align-items-center"
            onTouchStart={() => {
               if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
                  handleTouchStart();
               }
            }}
            onTouchEnd={() => {
               if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
                  handleTouchEnd();
               }
            }}
            onClick={() => {
               if (!/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
                  setShowCharsAs(showCharsAs === "value" ? "bonus" : "value");
               }
            }}
         >
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.dexterity > 10 ? "+" : ""}
                     {Math.floor((character.dexterity - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.dexterity}</span>
               )}
               <span>ЛВК</span>
            </div>
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.strength > 10 ? "+" : ""}
                     {Math.floor((character.strength - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.strength}</span>
               )}
               <span>СИЛ</span>
            </div>
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.constitution > 10 ? "+" : ""}
                     {Math.floor((character.constitution - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.constitution}</span>
               )}
               <span>ВНС</span>
            </div>
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.intelligence > 10 ? "+" : ""}
                     {Math.floor((character.intelligence - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.intelligence}</span>
               )}
               <span>ИНТ</span>
            </div>
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.charisma > 10 ? "+" : ""}
                     {Math.floor((character.charisma - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.charisma}</span>
               )}
               <span>ХРЗ</span>
            </div>
            <div className="characteristics">
               {showCharsAs === "bonus" ? (
                  <span>
                     {character.wisdom > 10 ? "+" : ""}
                     {Math.floor((character.wisdom - 10) / 2)}
                  </span>
               ) : (
                  <span>{character.wisdom}</span>
               )}
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
               <span className="fw-bold beige-text">
                  {character.shards.green +
                     character.shards.blue +
                     character.shards.red +
                     character.shards.black +
                     character.shards.white}
               </span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shieldIcon})` }}
            >
               <span className="fw-bold beige-text">{character.armor}</span>
            </div>
         </div>
         {/* ABILITIES */}
         <Link
            className="grid-area-abilities"
            to={`/characters/${character.id}/abilities`}
         >
            <button
               className="w-100 h-100 base-button brown-bg beige-text"
               role="button"
               tabIndex="0"
            >
               способности
            </button>
         </Link>
         {/* INVENTORY */}
         <Link
            className="grid-area-inventory"
            to={`/characters/${character.id}/inventory`}
         >
            <button className="w-100 h-100 base-button brown-bg beige-text d-flex align-items-center justify-content-center">
               инвентарь
            </button>
         </Link>

         {/* SELECT */}
         <button
            className={`grid-area-select base-button w-100 ${
               isSelected ? "beige-bg" : "brown-bg"
            }`}
            style={{ borderRadius: "0 0 0 0.375rem", cursor: "pointer" }}
            onClick={handleSelect}
            role="button"
            tabIndex="0"
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
            role="button"
            tabIndex="0"
         >
            <img src={binIcon} alt="delete" className="w-100" />
         </button>
      </div>
   );
}
