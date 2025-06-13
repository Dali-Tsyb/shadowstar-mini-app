import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import diceIcon from "../assets/images/dice-icon.svg";
import backArrowIcon from "../assets/images/back-arrow.svg";
import "../assets/css/ability.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as bootstrap from "bootstrap";

export default function InventoryPage() {
   const dispatch = useDispatch();
   const { id } = useParams();
   const character = useSelector(
      (state) => state.character.charactersList
   ).find((c) => c.id === Number(id));

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
      </div>
   );
}
