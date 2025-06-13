import diceIcon from "../assets/images/dice-icon.svg";
import crossIcon from "../assets/images/cross-icon.svg";
import "../assets/css/itemModal.css";

export default function ItemModal({ item }) {
   return (
      <div
         className="modal fade p-3"
         tabIndex="-1"
         aria-labelledby="itemModalLabel"
         onClick={() => document.activeElement?.blur()}
         id="itemModal"
      >
         <div
            className="modal-dialog modal-dialog-centered beige-bg brown-border rounded p-3 align-items-start"
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
            <div className="d-flex align-items-start gap-4 h-100">
               <div className="brown-border rounded beige-bg d-flex align-items-center justify-content-between img">
                  <img
                     className="w-100 p-1"
                     src={item?.item?.image || diceIcon}
                     alt={item?.item?.name}
                  />
               </div>
               <div className="d-flex flex-column gap-1 align-items-start text">
                  <div className="fw-bold name">{item?.item?.name}</div>
                  <div className="fw-bold equipped text-uppercase mb-1">
                     {item?.equipped ? "Надето" : ""}
                  </div>
                  <div className="description">{item?.item?.description}</div>
                  <button
                     type="button"
                     className="mt-4 brown-bg brown-border beige-text base-button rounded align-self-end delete-btn"
                     data-bs-dismiss="modal"
                     onClick={() => {
                        document.activeElement?.blur();
                     }}
                  >
                     Выбросить
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
