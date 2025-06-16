import "../../assets/css/characters/deleteCharacterModal.css";

export default function DeleteCharacterModal({ onConfirm, id }) {
   return (
      <div className="modal fade" id="deleteCharacterModal">
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-1 beige-bg brown-border">
               <div className="modal-body">
                  Вы действительно хотите удалить этого персонажа?
               </div>
               <div className="modal-footer border-0">
                  <button
                     type="button"
                     className="rounded py-1 px-2 dark-beige-bg brown-border brown-text"
                     data-bs-dismiss="modal"
                     onClick={() => document.activeElement?.blur()}
                  >
                     Отмена
                  </button>
                  <button
                     type="button"
                     className="rounded py-1 px-2 brown-bg brown-border beige-text"
                     data-bs-dismiss="modal"
                     onClick={() => {
                        onConfirm(id);
                        document.activeElement?.blur();
                     }}
                  >
                     Удалить
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
