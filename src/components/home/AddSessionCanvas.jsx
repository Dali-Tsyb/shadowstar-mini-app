import { useState } from "react";
import { useDispatch } from "react-redux";
import DOMPurify from "dompurify";

import "../../assets/css/home/addSessionCanvas.css";

import crossIcon from "../../assets/images/navigation/cross-icon.svg";

import { addSession } from "../../store/slices/sessionSlice";

export default function AddSessionCanvas() {
   const dispatch = useDispatch();
   const [sessionForm, setSessionForm] = useState({
      name: "",
      description: "",
   });

   const sendSessionForm = () => {
      dispatch(addSession(sessionForm));
   };

   return (
      <div className="offcanvas offcanvas-end beige-bg" id="addSessionCanvas">
         <div className="offcanvas-header d-flex justify-content-between">
            <h5 className="offcanvas-title fw-bold">Создать игру</h5>
            <button
               type="button"
               className="base-button rounded brown-bg beige-text p-1"
               style={{ width: "2rem", height: "2rem" }}
               data-bs-dismiss="offcanvas"
               aria-label="Close"
               onClick={() => {
                  setSessionForm({
                     name: "",
                     description: "",
                  });
               }}
            >
               <img className="w-100" src={crossIcon} alt="" />
            </button>
         </div>
         <div className="offcanvas-body d-flex flex-column gap-4">
            <div className="d-flex flex-column gap-1">
               <label htmlFor="sessionName">Название</label>
               <input
                  id="sessionName"
                  type="text"
                  className="w-100 brown-border rounded"
                  placeholder="Финальная битва"
                  value={sessionForm.name}
                  onChange={(e) => {
                     const cleanValue = DOMPurify.sanitize(e.target.value, {
                        ALLOWED_TAGS: [],
                        ALLOWED_ATTR: [],
                     });

                     setSessionForm({
                        ...sessionForm,
                        name: cleanValue,
                     });
                  }}
               />
            </div>
            <div className="d-flex flex-column gap-1">
               <label htmlFor="sessionDescription">Описание</label>
               <textarea
                  id="sessionDescription"
                  type="text"
                  rows="5"
                  style={{ resize: "none" }}
                  className="w-100 brown-border rounded text-left"
                  placeholder="Наконец решится судьба мира..."
                  value={sessionForm.description}
                  onChange={(e) => {
                     const cleanValue = DOMPurify.sanitize(e.target.value, {
                        ALLOWED_TAGS: [],
                        ALLOWED_ATTR: [],
                     });

                     setSessionForm({
                        ...sessionForm,
                        description: cleanValue,
                     });
                  }}
               />
            </div>
            <div className="d-flex justify-content-end gap-2">
               <button
                  type="button"
                  className="btn rounded dark-beige-bg brown-border brown-text"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                     setSessionForm({
                        name: "",
                        description: "",
                     });
                  }}
               >
                  Закрыть
               </button>
               <button
                  type="button"
                  className="btn rounded brown-bg brown-border beige-text"
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                     sendSessionForm();
                     setSessionForm({
                        name: "",
                        description: "",
                     });
                  }}
               >
                  Создать
               </button>
            </div>
         </div>
      </div>
   );
}
