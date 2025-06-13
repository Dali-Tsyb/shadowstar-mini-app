import diceIcon from "../assets/images/dice-icon.svg";
import crossIcon from "../assets/images/cross-icon.svg";
import "../assets/css/abilityModal.css";

export default function AbilitiesPage({ ability }) {


   return (
      <div
         className="modal fade p-5"
         tabIndex="-1"
         aria-labelledby="abilityModalLabel"
         onClick={() => document.activeElement?.blur()}
         id="abilityModal"
      >
         <div
            className="modal-dialog modal-dialog-centered beige-bg brown-border rounded p-4 align-items-start"
            onClick={(e) => {
               e.stopPropagation();
               e.preventDefault();
            }}
         >
            <button
               type="button"
               className="brown-bg brown-border rounded close-btn d-flex align-items-center justify-content-center"
            >
               <img src={crossIcon} alt="close" className="w-100" />
            </button>
            <div className="w-100 h-100 d-flex flex-column gap-1">
               <div className="fw-bold text-center fs-2 name">
                  {ability?.name}
               </div>
               <div className="text-center text-uppercase type">
                  {ability?.cooldown
                     ? `Актив(${ability?.cooldown} сек)`
                     : "Пассив"}
               </div>
               <div className="brown-border rounded beige-bg d-flex align-items-center justify-content-between my-3">
                  <img
                     className="w-100 p-4"
                     src={ability?.image || diceIcon}
                     alt={ability?.name}
                  />
               </div>
               <div className="text-center description">
                  {ability?.description}
               </div>
            </div>
         </div>
      </div>
   );
}
