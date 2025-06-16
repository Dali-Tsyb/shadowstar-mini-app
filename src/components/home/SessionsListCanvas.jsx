import { useDispatch, useSelector } from "react-redux";

import "../../assets/css/home/addSessionCanvas.css";

import crossIcon from "../../assets/images/navigation/cross-icon.svg";

import { setCurrentSession } from "../../store/slices/sessionSlice";

export default function SessionsListCanvas() {
   const dispatch = useDispatch();
   const sessions = useSelector((state) => state.session.sessionsList);

   const handleSessionSelect = (session) => {
      dispatch(setCurrentSession(session));
   };

   return (
      <div className="offcanvas offcanvas-end beige-bg" id="sessionsListCanvas">
         <div className="offcanvas-header d-flex justify-content-between">
            <h5 className="offcanvas-title fw-bold">Список Игр</h5>
            <button
               type="button"
               className="base-button rounded brown-bg beige-text p-1"
               style={{ width: "2rem", height: "2rem" }}
               data-bs-dismiss="offcanvas"
               aria-label="Close"
            >
               <img className="w-100" src={crossIcon} alt="" />
            </button>
         </div>
         <div className="offcanvas-body d-flex flex-column gap-4">
            {sessions.map((session) => (
               <div
                  className="p-2 beige-bg brown-border rounded d-flex flex-column gap-2"
                  key={session.id}
                  data-bs-dismiss="offcanvas"
                  onClick={() => {
                     handleSessionSelect(session);
                  }}
               >
                  <p className="mb-0 fw-bold fs-6">{session.name}</p>
                  <p className="mb-0">{session.description}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
