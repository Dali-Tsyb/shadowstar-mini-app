import { useEffect } from "react";
import { Modal } from "bootstrap";

import "../../assets/css/characters/deleteCharacterModal.css";

export default function DemoVersionModal() {
   useEffect(() => {
      const hasSeenModal = sessionStorage.getItem("hasSeenDemoVersionModal");

      if (!hasSeenModal) {
         const modalEl = document.getElementById("demoVersionModal");
         if (modalEl) {
            const bsModal = new Modal(modalEl);
            bsModal.show();
            sessionStorage.setItem("hasSeenDemoVersionModal", "true");
         }
      }
   }, []);

   return (
      <div className="modal fade" id="demoVersionModal">
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-1 beige-bg brown-border">
               <div className="modal-body text-center fw-semibold">
                  В данный момент приложение находится в ранней стадии
                  разработки, поэтому ваши данные могут быть удалены.
               </div>
            </div>
         </div>
      </div>
   );
}
