import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import hpIcon from "../../assets/images/characters/hp-icon.webp";
import shieldIcon from "../../assets/images/characters/shield-icon.webp";
import arrowIcon from "../../assets/images/navigation/arrow.svg";

import BasicDropdown from "../common/BasicDropdown";

export default function CreateCharacterCard({ character, sendCharacter }) {
   const { t } = useTranslation();

   function generateShards() {
      if (Math.random() < 0.5) {
         return {
            green: Math.random() < 0.2 ? 1 : 0,
            blue: Math.random() < 0.2 ? 1 : 0,
            red: Math.random() < 0.2 ? 1 : 0,
            black: Math.random() < 0.2 ? 1 : 0,
            white: Math.random() < 0.2 ? 1 : 0,
         };
      } else {
         return undefined;
      }
   }

   //character form
   const [characterForm, setCharacterForm] = useState({
      name: "",
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      race_id: null,
      profession_id: null,
      level_id: 1,
      hp: 0,
      armor: 8,
      shards: generateShards(),
      is_npc: false,
      avatar_url: "",
      session_id: null,
   });

   //races
   const races = useSelector((state) => state.race.racesList);
   const handleRaceSelect = (race) => {
      setCharacterForm((prev) => ({
         ...prev,
         race_id: race.id,
      }));
   };
   //professions
   const professions = useSelector((state) => state.profession.professionsList);
   const handleProfessionSelect = (profession) => {
      setCharacterForm((prev) => ({
         ...prev,
         profession_id: profession.id,
      }));
   };

   //count hp
   const levels = useSelector((state) => state.level.levelsList);
   useEffect(() => {
      if (!characterForm.race_id) return;
      setCharacterForm((prev) => ({
         ...prev,
         hp:
            races.find((race) => race.id === characterForm.race_id).extra_hp +
            levels.find((level) => level.id === characterForm.level_id)
               .hp_increase +
            Math.floor((prev.constitution - 10) / 2),
      }));
   }, [
      characterForm.constitution,
      races,
      characterForm.race_id,
      levels,
      characterForm.level_id,
   ]);
   //count armor
   useEffect(() => {
      setCharacterForm((prev) => ({
         ...prev,
         armor: 8 + Math.floor((prev.dexterity - 10) / 2),
      }));
   }, [characterForm.dexterity]);

   //count stats bonuses from race and profession
   const [statPoints, setStatPoints] = useState(2);
   useEffect(() => {
      if (!characterForm.race_id || !characterForm.profession_id) return;
      setCharacterForm((prev) => ({
         ...prev,
         strength:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .strength_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).strength_bonus,
         dexterity:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .dexterity_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).dexterity_bonus,
         constitution:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .constitution_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).constitution_bonus,
         intelligence:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .intelligence_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).intelligence_bonus,
         wisdom:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .wisdom_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).wisdom_bonus,
         charisma:
            10 +
            races.find((race) => race.id === characterForm.race_id)
               .charisma_bonus +
            professions.find(
               (profession) => profession.id === characterForm.profession_id
            ).charisma_bonus,
      }));
      setStatPoints(2);
   }, [characterForm.race_id, characterForm.profession_id, races, professions]);

   //error text for validation
   const [errorText, setErrorText] = useState("");
   //validation
   const validateCurrentField = () => {
      if (currentField === "name") {
         if (characterForm.name === "") {
            setErrorText("Сначала введи имя!");
            return false;
         } else if (characterForm.name.length < 2) {
            setErrorText(
               "Может что-нибудь пооригинальнее?.. Например, больше 1 буквы?"
            );
            return false;
         } else {
            setErrorText("");
            setFieldsShowing((prev) => [...prev, "race"]);
            setCurrentField("race");
            return true;
         }
      } else if (currentField === "race") {
         if (!characterForm.race_id) {
            setErrorText("Выбери расу!");
            return false;
         } else {
            setErrorText("");
            setFieldsShowing((prev) => [...prev, "profession"]);
            setCurrentField("profession");
            return true;
         }
      } else if (currentField === "profession") {
         if (!characterForm.profession_id) {
            setErrorText("Выбери класс!");
            return false;
         } else {
            setErrorText("");
            setFieldsShowing((prev) => [...prev, "characteristics"]);
            setCurrentField("characteristics");
            return true;
         }
      } else if (currentField === "characteristics") {
         if (
            !characterForm.strength ||
            !characterForm.dexterity ||
            !characterForm.constitution ||
            !characterForm.intelligence ||
            !characterForm.wisdom ||
            !characterForm.charisma
         ) {
            return false;
         } else {
            setErrorText("");
            sendCharacter(characterForm);
            return true;
         }
      }
   };

   const handleChange = (e) => {
      let input = e.target.value;

      // 1. Remove any characters except letters (Latin, Cyrillic) and space
      input = input.replace(/[^a-zA-Zа-яА-ЯёЁ ]/g, "");

      // 2. Replace multiple spaces with a single space
      input = input.replace(/\s{2,}/g, " ");

      // 3. Trim leading/trailing spaces
      input = input.trimStart();

      // 4. Prevent input that doesn't start with a letter
      if (input !== "" && !/[a-zA-Zа-яА-ЯёЁ]/.test(input)) return;

      setCharacterForm((prev) => ({ ...prev, name: input }));
   };

   const handleBlur = () => {
      // On blur, remove trailing spaces and ensure it ends with a letter
      let trimmed = characterForm.name.trim();
      if (!/^[a-zA-Zа-яА-ЯёЁ].*[a-zA-Zа-яА-ЯёЁ]$/.test(trimmed)) {
         trimmed = "";
      }
      setCharacterForm((prev) => ({ ...prev, name: trimmed }));
   };

   //for step by step creation
   const [currentField, setCurrentField] = useState("name");
   const [fieldsShowing, setFieldsShowing] = useState(["name"]);

   //for auto focus on the first field
   const nameInputRef = useRef(null);
   useEffect(() => {
      if (!character.id && nameInputRef.current) {
         nameInputRef.current.focus();
      }
   }, [character.id]);
   //for race & profession dropdowns
   const [openDropdown, setOpenDropdown] = useState(null);
   const toggleDropdown = (type) => {
      setOpenDropdown((prev) => (prev === type ? null : type));
   };

   return (
      <div
         className="create-blocks-container h-100 w-100 brown-border rounded dark-beige-bg"
         style={{ boxShadow: "0 0 0.5rem #382610" }}
      >
         {/* NAME */}
         <div
            className="grid-area-name brown-border p-2 beige-bg d-flex justify-content-center align-items-center position-relative"
            style={{ borderRadius: "0.375rem 0 0 0" }}
         >
            <input
               className="brown-text text-center bg-transparent border-0 w-100"
               type="text"
               value={characterForm.name}
               onChange={(e) => {
                  handleChange(e);
               }}
               onBlur={handleBlur}
               onFocus={() => setCurrentField("name")}
               ref={nameInputRef}
            />
         </div>
         {/* RACE */}
         <button
            className="grid-area-race brown-border brown-bg text-uppercase text-center fw-bold d-flex justify-content-between align-items-center ps-2 position-relative w-100"
            style={{
               borderRadius: "0 0.375rem 0 0",
               opacity: fieldsShowing.includes("race") ? "1" : "0",
               pointerEvents: fieldsShowing.includes("race") ? "auto" : "none",
               transition: "opacity 0.2s ease-in-out",
               cursor: "pointer",
            }}
            role="button"
            tabIndex="0"
            onClick={() => {
               setCurrentField("race");
               toggleDropdown("race");
            }}
         >
            <span className="beige-text" style={{ wordBreak: "break-all" }}>
               {characterForm.race_id
                  ? t(
                       `races.${
                          races.find(
                             (race) => race.id === characterForm.race_id
                          )?.name
                       }`
                    )
                  : "Раса"}
            </span>
            <span
               style={{
                  width: "1.7rem",
                  height: "1.7rem",
                  top: "0.35rem",
                  right: "0.35rem",
               }}
            >
               <img
                  src={arrowIcon}
                  alt=""
                  className="w-100"
                  style={{
                     transition: "all 0.2s ease-in-out",
                     transform:
                        openDropdown === "race"
                           ? "rotate(0deg)"
                           : "rotate(-180deg)",
                  }}
               />
            </span>
            {openDropdown === "race" && (
               <BasicDropdown
                  options={races}
                  onSelect={handleRaceSelect}
                  entity="races"
               />
            )}
         </button>
         {/* CLASS */}
         <button
            className="grid-area-profession brown-border brown-bg text-uppercase text-center fw-bold d-flex justify-content-between align-items-center ps-2 position-relative w-100"
            style={{
               opacity: fieldsShowing.includes("profession") ? "1" : "0",
               pointerEvents: fieldsShowing.includes("profession")
                  ? "auto"
                  : "none",
               transition: "opacity 0.2s ease-in-out",
               cursor: "pointer",
            }}
            role="button"
            tabIndex="0"
            onClick={() => {
               setCurrentField("profession");
               toggleDropdown("profession");
            }}
         >
            <span className="beige-text" style={{ wordBreak: "break-all" }}>
               {characterForm.profession_id
                  ? t(
                       `professions.${
                          professions.find(
                             (profession) =>
                                profession.id === characterForm.profession_id
                          )?.name
                       }`
                    )
                  : "Класс"}
            </span>
            <span
               style={{
                  width: "1.7rem",
                  height: "1.7rem",
                  top: "0.35rem",
                  right: "0.35rem",
               }}
            >
               <img
                  src={arrowIcon}
                  alt=""
                  className="w-100"
                  style={{
                     transition: "all 0.2s ease-in-out",
                     transform:
                        openDropdown === "profession"
                           ? "rotate(0deg)"
                           : "rotate(-180deg)",
                  }}
               />
            </span>
            {openDropdown === "profession" && (
               <BasicDropdown
                  options={professions}
                  onSelect={handleProfessionSelect}
                  entity="professions"
               />
            )}
         </button>
         {/* HINT */}
         <button
            className="grid-area-hint brown-border overflow-hidden dark-beige-bg beige-text d-flex flex-column justify-content-center align-items-center p-2 text-center gap-3"
            onClick={validateCurrentField}
            role="button"
            tabIndex="0"
            style={{ cursor: "pointer" }}
         >
            <span>
               {currentField === "name" &&
                  errorText.length === 0 &&
                  "Введи имя персонажа и тыкни здесь"}

               {currentField === "race" &&
                  errorText.length === 0 &&
                  "Выбери расу и тыкни здесь"}
               {currentField === "profession" &&
                  errorText.length === 0 &&
                  "Выбери класс и тыкни здесь"}
               {currentField === "characteristics" &&
                  errorText.length === 0 &&
                  "Установи характеристики и тыкни здесь, чтобы сохранить своего героя!"}
               {errorText.length > 0 && errorText}
            </span>
            <span className="fw-bold">
               {currentField === "characteristics" &&
                  errorText.length === 0 &&
                  "Осталось очков характеристик: " + statPoints}
            </span>
         </button>
         {/* CHARACTERISTICS */}
         <div
            className="grid-area-characteristics brown-border beige-bg d-flex flex-column justify-content-between align-items-center"
            style={{
               opacity: fieldsShowing.includes("characteristics") ? 1 : 0,
               pointerEvents: fieldsShowing.includes("characteristics")
                  ? "auto"
                  : "none",
               transition: "opacity 0.2s ease-in-out",
               padding: "0.7rem",
               cursor: "pointer",
            }}
            onClick={() => {
               setCurrentField("characteristics");
            }}
            role="button"
            tabIndex="0"
         >
            {/* DEXTERITY */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           dexterity: characterForm.dexterity - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     role="button"
                     tabIndex="0"
                     disabled={
                        characterForm.dexterity <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.dexterity_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.dexterity_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.dexterity}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           dexterity: characterForm.dexterity + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     role="button"
                     tabIndex="0"
                     disabled={
                        characterForm.dexterity >= 16 || statPoints === 0
                     }
                  >
                     +
                  </button>
               </div>

               <span>ЛВК</span>
            </div>
            {/* STRENGTH */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           strength: characterForm.strength - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     role="button"
                     tabIndex="0"
                     disabled={
                        characterForm.strength <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.strength_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.strength_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.strength}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           strength: characterForm.strength + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     role="button"
                     tabIndex="0"
                     disabled={characterForm.strength >= 16 || statPoints === 0}
                  >
                     +
                  </button>
               </div>
               <span>СИЛ</span>
            </div>
            {/* CONSTITUTION */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           constitution: characterForm.constitution - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     disabled={
                        characterForm.constitution <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.constitution_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.constitution_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.constitution}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           constitution: characterForm.constitution + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     disabled={
                        characterForm.constitution >= 16 || statPoints === 0
                     }
                  >
                     +
                  </button>
               </div>
               <span>ВНС</span>
            </div>
            {/* INTELLIGENCE */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           intelligence: characterForm.intelligence - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     disabled={
                        characterForm.intelligence <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.intelligence_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.intelligence_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.intelligence}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           intelligence: characterForm.intelligence + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     disabled={
                        characterForm.intelligence >= 16 || statPoints === 0
                     }
                  >
                     +
                  </button>
               </div>
               <span>ИНТ</span>
            </div>
            {/* CHARISMA */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           charisma: characterForm.charisma - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     disabled={
                        characterForm.charisma <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.charisma_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.charisma_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.charisma}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           charisma: characterForm.charisma + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     disabled={characterForm.charisma >= 16 || statPoints === 0}
                  >
                     +
                  </button>
               </div>
               <span>ХРЗ</span>
            </div>
            {/* WISDOM */}
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           wisdom: characterForm.wisdom - 1,
                        });
                        setStatPoints((prev) => prev + 1);
                     }}
                     disabled={
                        characterForm.wisdom <=
                        4 +
                           races.find(
                              (race) => race.id === characterForm.race_id
                           )?.wisdom_bonus +
                           professions.find(
                              (profession) =>
                                 profession.id === characterForm.profession_id
                           )?.wisdom_bonus
                     }
                  >
                     -
                  </button>
                  <span>{characterForm.wisdom}</span>
                  <button
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center characteristics-btn"
                     onClick={() => {
                        setCharacterForm({
                           ...characterForm,
                           wisdom: characterForm.wisdom + 1,
                        });
                        setStatPoints((prev) => prev - 1);
                     }}
                     disabled={characterForm.wisdom >= 16 || statPoints === 0}
                  >
                     +
                  </button>
               </div>
               <span>МДР</span>
            </div>
         </div>
         {/* STATS */}
         <div
            className="d-flex justify-content-between align-items-center grid-area-stats brown-border px-2 py-1 beige-bg"
            style={{
               borderRadius: "0 0 0 0.375rem",
               opacity: fieldsShowing.includes("characteristics") ? 1 : 0,
               pointerEvents: fieldsShowing.includes("characteristics")
                  ? "auto"
                  : "none",
               transition: "opacity 0.3s ease-in-out",
            }}
         >
            <div
               className="stats"
               style={{ backgroundImage: `url(${hpIcon})` }}
            >
               <span className="fw-bold beige-text">{characterForm.hp}</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shieldIcon})` }}
            >
               <span className="fw-bold beige-text">{characterForm.armor}</span>
            </div>
         </div>
      </div>
   );
}
