import hpIcon from "../assets/images/hp-icon.webp";
import shieldIcon from "../assets/images/shield-icon.webp";
import { useEffect, useRef, useState } from "react";
import arrowIcon from "../assets/images/arrow.svg";
import BasicDropdown from "./basicDropdown";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CreateCharacterCard({ character, sendCharacter }) {
   const { t } = useTranslation();
   const [characterForm, setCharacterForm] = useState({
      name: "",
      strength_user: 10,
      dexterity_user: 10,
      constitution_user: 10,
      intelligence_user: 10,
      wisdom_user: 10,
      charisma_user: 10,
      race_id: null,
      profession_id: null,
      level_id: 1,
   });

   const [errorText, setErrorText] = useState("");

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
            !characterForm.strength_user ||
            !characterForm.dexterity_user ||
            !characterForm.constitution_user ||
            !characterForm.intelligence_user ||
            !characterForm.wisdom_user ||
            !characterForm.charisma_user
         ) {
            return false;
         } else {
            setErrorText("");
            sendCharacter(characterForm);
            return true;
         }
      }
   };

   const [currentField, setCurrentField] = useState("name");
   const [fieldsShowing, setFieldsShowing] = useState(["name"]);

   const nameInputRef = useRef(null);

   useEffect(() => {
      if (!character.id && nameInputRef.current) {
         nameInputRef.current.focus();
      }
   }, [character.id]);

   const [openDropdown, setOpenDropdown] = useState(null);

   const toggleDropdown = (type) => {
      setOpenDropdown((prev) => (prev === type ? null : type));
   };

   const races = useSelector((state) => state.race.racesList);
   const handleRaceSelect = (race) => {
      setCharacterForm((prev) => ({
         ...prev,
         race_id: race.id,
      }));
   };

   const professions = useSelector((state) => state.profession.professionsList);
   const handleProfessionSelect = (profession) => {
      setCharacterForm((prev) => ({
         ...prev,
         profession_id: profession.id,
      }));
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
                  const input = e.target.value;
                  if (/^[a-zA-Zа-яА-ЯёЁ]*$/.test(input)) {
                     setCharacterForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                     }));
                  }
               }}
               onFocus={() => setCurrentField("name")}
               ref={nameInputRef}
            />
         </div>
         {/* RACE */}
         <div
            className="grid-area-race brown-border brown-bg text-uppercase text-center fw-bold d-flex justify-content-between align-items-center ps-2 position-relative"
            style={{
               borderRadius: "0 0.375rem 0 0",
               visibility: fieldsShowing.includes("race")
                  ? "visible"
                  : "hidden",
            }}
            onClick={() => {
               setCurrentField("race");
               toggleDropdown("race");
            }}
         >
            <span className="beige-text">
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
         </div>
         {/* CLASS */}
         <div
            className="grid-area-profession brown-border brown-bg text-uppercase text-center fw-bold d-flex justify-content-between align-items-center ps-2 position-relative"
            style={{
               visibility: fieldsShowing.includes("profession")
                  ? "visible"
                  : "hidden",
            }}
            onClick={() => {
               setCurrentField("profession");
               toggleDropdown("profession");
            }}
         >
            <span className="beige-text">
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
         </div>
         {/* HINT */}
         <div
            className="grid-area-hint brown-border overflow-hidden dark-beige-bg beige-text d-flex justify-content-center align-items-center p-2 text-center"
            onClick={validateCurrentField}
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
         </div>
         {/* CHARACTERISTICS */}
         <div
            className="grid-area-characteristics brown-border beige-bg d-flex flex-column justify-content-between align-items-center"
            style={{
               opacity: fieldsShowing.includes("characteristics") ? 1 : 0,
               padding: "0.7rem",
            }}
         >
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           dexterity_user: characterForm.dexterity_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.dexterity_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           dexterity_user: characterForm.dexterity_user + 1,
                        })
                     }
                  >
                     +
                  </span>
               </div>

               <span>ЛВК</span>
            </div>
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           strength_user: characterForm.strength_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.strength_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           strength_user: characterForm.strength_user + 1,
                        })
                     }
                  >
                     +
                  </span>
               </div>
               <span>СИЛ</span>
            </div>
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           constitution_user:
                              characterForm.constitution_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.constitution_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           constitution_user:
                              characterForm.constitution_user + 1,
                        })
                     }
                  >
                     +
                  </span>
               </div>
               <span>ВНС</span>
            </div>
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           intelligence_user:
                              characterForm.intelligence_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.intelligence_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           intelligence_user:
                              characterForm.intelligence_user + 1,
                        })
                     }
                  >
                     +
                  </span>
               </div>
               <span>ИНТ</span>
            </div>
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           charisma_user: characterForm.charisma_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.charisma_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           charisma_user: characterForm.charisma_user + 1,
                        })
                     }
                  >
                     +
                  </span>
               </div>
               <span>ХРЗ</span>
            </div>
            <div className="characteristics">
               <div className="d-flex align-items-center gap-1 justify-content-between w-100">
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           wisdom_user: characterForm.wisdom_user - 1,
                        })
                     }
                  >
                     -
                  </span>
                  <span>{characterForm.wisdom_user}</span>
                  <span
                     className="brown-bg brown-border beige-text d-flex align-items-center justify-content-center"
                     onClick={() =>
                        setCharacterForm({
                           ...characterForm,
                           wisdom_user: characterForm.wisdom_user + 1,
                        })
                     }
                  >
                     +
                  </span>
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
            }}
         >
            <div
               className="stats"
               style={{ backgroundImage: `url(${hpIcon})` }}
            >
               <span className="fw-bold beige-text">0</span>
            </div>
            <div
               className="stats"
               style={{ backgroundImage: `url(${shieldIcon})` }}
            >
               <span className="fw-bold beige-text">0</span>
            </div>
         </div>
      </div>
   );
}
