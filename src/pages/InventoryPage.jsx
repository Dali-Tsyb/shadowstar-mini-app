import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import diceIcon from "../assets/images/dice-icon.svg";
import backArrowIcon from "../assets/images/back-arrow.svg";
import "../assets/css/inventory.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as bootstrap from "bootstrap";
import ItemModal from "../components/ItemModal";

export default function InventoryPage() {
   const dispatch = useDispatch();
   const { id } = useParams();
   const character = useSelector(
      (state) => state.character.charactersList
   ).find((c) => c.id === Number(id));

   const items = character.inventory_items;

   const totalSlots = Math.max(items.length, 36);
   const slots = Array.from({ length: totalSlots }, (_, i) => items[i] || null);

   const [currentItem, setCurrentItem] = useState(null);
   const openItemModal = (item) => {
      setCurrentItem(item);
      const modal = new bootstrap.Modal(document.getElementById("itemModal"));
      modal.show();
   };

   return (
      <div className="px-4 h-100 d-flex flex-column overflow-hidden">
         {/* HEADER */}
         <div className="w-100 d-flex justify-content-between align-items-center inventory-btns">
            <Link to="/characters">
               <button className="base-button brown-bg rounded">
                  <img className="w-100" src={backArrowIcon} alt="back" />
               </button>
            </Link>
            <div className="fw-bold m-0">Инвентарь</div>
         </div>

         {/* GRID */}
         <div className="inventory-grid-container flex-grow-1 overflow-auto mt-4">
            <div className="inventory-grid">
               {slots.map((item, index) => (
                  <div
                     className="inventory-slot dark-beige-bg brown-border rounded d-flex align-items-center justify-content-center p-2"
                     key={index}
                  >
                     {item && (
                        <div
                           className="item"
                           onClick={() => openItemModal(item)}
                        >
                           <img
                              src={item.item.image || diceIcon}
                              alt={item.item.name}
                              className="w-100"
                           />
                           <div className="quantity">{item.quantity}</div>
                        </div>
                     )}
                  </div>
               ))}
            </div>
         </div>

         {/* FOOTER */}
         <div className="fw-bold text-center mt-2">
            {items.reduce((total, item) => total + item.weight, 0) || 0}
         </div>
         <ItemModal item={currentItem} />
      </div>
   );
}
