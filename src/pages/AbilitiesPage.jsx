import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import diceIcon from "../assets/images/dice-icon.svg";
import backArrowIcon from "../assets/images/back-arrow.svg";
import "../assets/css/ability.css";
import AbilityModal from "../components/AbilityModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as bootstrap from "bootstrap";
import { updateCharacter } from "../store/slices/characterSlice";

export default function AbilitiesPage() {
   const dispatch = useDispatch();
   const { id } = useParams();
   const character = useSelector(
      (state) => state.character.charactersList
   ).find((c) => c.id === Number(id));

   const allowedAbilities = useSelector(
      (state) => state.ability.abilitiesList
   ).filter(
      (a) =>
         a.allowed_professions.includes(character?.profession.name) ||
         a.allowed_races.includes(character?.race.name) ||
         a.character_ids.includes(character?.id)
   );

   const characterAbilities = character.abilities.map((a) =>
      allowedAbilities.find((b) => b.id === a)
   );

   const [currentAbility, setCurrentAbility] = useState(null);

   const [characterAbilitiesForm, setCharacterAbilitiesForm] = useState({
      character_id: character?.id,
      abilities: character?.abilities,
   });

   const openAbilityModal = (ability) => {
      setCurrentAbility(ability);

      const modal = new bootstrap.Modal(
         document.getElementById("abilityModal")
      );
      modal.show();
   };

   const toggleAbility = (ability, checked) => {
      if (checked) {
         setCharacterAbilitiesForm((prev) => ({
            ...prev,
            abilities: [...prev.abilities, ability.id],
         }));
      } else {
         setCharacterAbilitiesForm((prev) => ({
            ...prev,
            abilities: prev.abilities.filter((a) => a !== ability.id),
         }));
      }
      console.log(characterAbilitiesForm);
   };

   const saveAbilities = () => {
      dispatch(updateCharacter(characterAbilitiesForm));
   };

   return (
      <div className="d-flex flex-column h-100 gap-4  px-4">
         <div className="w-100 d-flex justify-content-between align-items-center ability-btns">
            <Link to="/characters">
               <button className="base-button brown-bg rounded">
                  <img className="w-100" src={backArrowIcon} alt="back" />
               </button>
            </Link>
            <div className="fw-bold m-0">Список способностей</div>
         </div>
         {characterAbilities.length === 0 && (
            <div className="d-flex flex-column gap-2">
               {allowedAbilities.map((ability) => (
                  <div
                     key={ability.id}
                     className="dark-beige-bg brown-border p-2 rounded d-flex align-items-center gap-2"
                     onClick={() => {
                        openAbilityModal(ability);
                     }}
                  >
                     <div className="img brown-border rounded beige-bg d-flex align-items-center justify-content-center">
                        <img
                           className="w-100 p-2"
                           src={ability.image || diceIcon}
                           alt={ability.name}
                        />
                     </div>

                     <div className="text d-flex flex-column gap-1">
                        <h2 className="fw-bold m-0 name">{ability.name}</h2>
                        <div className="type text-uppercase mb-1">
                           {ability.cooldown
                              ? `Актив(${ability.cooldown} сек)`
                              : "Пассив"}
                        </div>

                        <div className="description">{ability.description}</div>
                     </div>
                     <label
                        className="checkbox"
                        onClick={(e) => e.stopPropagation()}
                     >
                        <input
                           type="checkbox"
                           checked={characterAbilitiesForm.abilities.includes(
                              ability.id
                           )}
                           onChange={(e) =>
                              toggleAbility(ability, e.target.checked)
                           }
                        />
                        <span className="checkmark m-0 brown-border"></span>
                     </label>
                  </div>
               ))}
            </div>
         )}
         {characterAbilities.length > 0 && (
            <div className="d-flex flex-column gap-2">
               {characterAbilities.map((ability) => (
                  <div
                     key={ability.id}
                     className="dark-beige-bg brown-border p-2 rounded d-flex align-items-center gap-2"
                     onClick={() => {
                        openAbilityModal(ability);
                     }}
                  >
                     <div className="img brown-border rounded beige-bg d-flex align-items-center justify-content-center">
                        <img
                           className="w-100 p-2"
                           src={ability.image || diceIcon}
                           alt={ability.name}
                        />
                     </div>

                     <div className="text d-flex flex-column gap-1">
                        <h2 className="fw-bold m-0 name">{ability.name}</h2>
                        <div className="type text-uppercase mb-1">
                           {ability.cooldown
                              ? `Актив(${ability.cooldown} сек)`
                              : "Пассив"}
                        </div>

                        <div className="description">{ability.description}</div>
                     </div>
                  </div>
               ))}
            </div>
         )}
         {!characterAbilities.length && (
            <button
               className="base-button brown-bg beige-text rounded mt-auto save-btn"
               disabled={
                  !characterAbilitiesForm.abilities.length ||
                  character.abilities === characterAbilitiesForm.abilities
               }
               onClick={saveAbilities}
            >
               Сохранить
            </button>
         )}
         <AbilityModal ability={currentAbility} />
      </div>
   );
}
