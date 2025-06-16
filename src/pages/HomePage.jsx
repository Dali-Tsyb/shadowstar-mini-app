import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "bootstrap";
import DOMPurify from "dompurify";

import "../assets/css/home/home.css";
import "../assets/css/characters/characters.css";

import titleBg from "../assets/images/homePage/title-bg.webp";
import homeMap from "../assets/images/homePage/home-map-img.webp";
import profileIcon from "../assets/images/homePage/profile-icon.webp";
import settingsIcon from "../assets/images/homePage/settings-icon.webp";
import arrowIcon from "../assets/images/navigation/arrow.svg";
import editIcon from "../assets/images/navigation/edit-icon.webp";

import { updateRole } from "../store/slices/playerSlice";
import { setCurrentSession } from "../store/slices/sessionSlice";

import DemoVersionModal from "../components/home/DemoVersionModal";
import AddSessionCanvas from "../components/home/AddSessionCanvas";
import SessionsListCanvas from "../components/home/SessionsListCanvas";

export default function HomePage() {
   const dispatch = useDispatch();

   //current user
   const player = useSelector((state) => state.player.currentPlayer);

   const currentSession = useSelector((state) => state.session.currentSession);

   //current role
   const [role, setRole] = useState("player");
   //change roles
   useEffect(() => {
      if (player?.active_as) {
         setRole(player.active_as);
      }
   }, [player?.active_as]);
   //change role
   const handleRoleChange = (newRole) => {
      dispatch(updateRole(newRole));
   };

   //session code
   const [gameCode, setGameCode] = useState("");
   const sessions = useSelector((state) => state.session.sessionsList);

   const handleConnectToSession = (code) => {
      const session = sessions.find((s) => s.id == code);
      if (session) {
         dispatch(setCurrentSession(session));
         setGameCode("");
      } else {
         const bsModal = new Modal(document.getElementById("errorModal"));
         bsModal.show();
      }
   };

   const handleChangeCurrentSession = () => {
      dispatch(setCurrentSession(null));
   };

   return (
      <>
         <div className="px-4 d-flex flex-column justify-content-between gap-3 h-100">
            {/* TITLE */}
            <div className="title-container">
               <img src={titleBg} alt="title bg" />
               <h1 className="title-text d-flex justify-content-center align-items-center w-100 h-100">
                  Shadow Star
               </h1>
            </div>
            {/* ROLES SWITCH */}
            <div className="d-flex justify-content-center align-items-center rounded">
               <button
                  className={
                     role === "player"
                        ? "role-button brown-bg beige-text"
                        : "role-button beige-bg brown-text"
                  }
                  onClick={() => {
                     handleRoleChange("player");
                     setRole("player");
                  }}
               >
                  Игрок
               </button>
               <button
                  className={
                     role === "master"
                        ? "role-button brown-bg beige-text"
                        : "role-button beige-bg brown-text"
                  }
                  onClick={() => {
                     if (player?.role === "master") {
                        handleRoleChange("master");
                     }
                     setRole("master");
                  }}
               >
                  Мастер
               </button>
            </div>
            {/* GAME CODE INPUT */}
            {role === "player" && !currentSession?.id && (
               <div className="d-flex justify-content-center align-items-center game-code-input">
                  <input
                     type="number"
                     placeholder="Введите код игры"
                     className={`w-100 rounded bg-transparent fw-semibold brown-text brown-border ${
                        gameCode ? "pe-5" : ""
                     } `}
                     onChange={(e) => {
                        const cleanValue = DOMPurify.sanitize(e.target.value, {
                           ALLOWED_TAGS: [],
                           ALLOWED_ATTR: [],
                        });

                        setGameCode(cleanValue);
                     }}
                  />

                  {gameCode && (
                     <button
                        type="submit"
                        onClick={() => handleConnectToSession(gameCode)}
                        className="brown-bg brown-border rounded base-button submit-code p-0"
                     >
                        <img src={arrowIcon} className="w-100" alt="submit" />
                     </button>
                  )}
               </div>
            )}
            {role === "player" && currentSession?.id && (
               <div className="d-flex justify-content-center align-items-center game-code-input">
                  <div className="d-flex flex-column gap-2">
                     <div className="text-center fw-bold fs-6">
                        {currentSession.name || "-"}
                     </div>
                     <div className="text-center fw-semibold">
                        {currentSession.description || "-"}
                     </div>
                  </div>
               </div>
            )}
            {/* ERROR */}
            <div className="modal fade" id="errorModal">
               <div className="modal-dialog mx-3 modal-dialog-centered">
                  <div className="modal-content beige-bg p-3">
                     <div className="modal-body text-center">
                        Не удалось подключиться к игре. Проверьте правильность
                        кода.
                     </div>
                  </div>
               </div>
            </div>

            {/* MASTER INTERFACE */}
            {role === "master" && player?.active_as === "player" && (
               <div className="d-flex flex-column gap-3 justify-content-between align-items-center game-code-input my-auto">
                  <div className="d-flex flex-column gap-2 align-items-center">
                     <div className="text-center fw-semibold fs-5 mb-4">
                        Начни свое приключение!
                     </div>
                     {currentSession.id && (
                        <div className="d-flex flex-column gap-2 brown-border border-bottom-0 border-end-0 border-start-0 mx-3 py-4">
                           <div className="text-center fw-bold fs-6">
                              {currentSession.name || "-"}
                           </div>
                           <div className="text-center fw-semibold">
                              {currentSession.description || "-"}
                           </div>
                        </div>
                     )}
                  </div>
                  {!currentSession.id && (
                     <div className="d-flex gap-2">
                        <button
                           className="base-button beige-bg brown-text rounded support-btn"
                           style={{ fontSize: "0.8rem" }}
                           data-bs-toggle="offcanvas"
                           data-bs-target="#addSessionCanvas"
                        >
                           Создать новую игру
                        </button>
                        <button
                           className="base-button beige-bg brown-text rounded support-btn"
                           data-bs-toggle="offcanvas"
                           data-bs-target="#sessionsListCanvas"
                           style={{ fontSize: "0.8rem" }}
                        >
                           Выбрать из списка
                        </button>
                     </div>
                  )}
               </div>
            )}

            {/* BECOME A MASTER */}
            {role === "master" && player?.active_as === "player" && (
               <div className="d-flex flex-column justify-content-center align-items-center game-code-input gap-4 my-auto">
                  <div className="text-center fw-semibold fs-6 mx-3">
                     Открой таинственные свитки <br /> Мастера Подземелий и
                     создавай собственную историю!
                  </div>
                  <button className="base-button brown-bg beige-text rounded">
                     Стать мастером
                  </button>
               </div>
            )}

            {/* MAP */}
            {role === "player" && (
               <div className="d-flex justify-content-center align-items-center home-map overflow-hidden rounded">
                  <img
                     src={homeMap}
                     alt="map"
                     className="brown-border rounded"
                  />
               </div>
            )}

            {/* PLAY BUTTON */}
            <div className="d-flex gap-1 align-items-start">
               <button
                  className="base-button brown-bg beige-text rounded play-btn"
                  disabled={!currentSession?.id}
               >
                  начать игру
               </button>
               {currentSession.id && (
                  <button
                     className="base-button brown-bg beige-text rounded change-session-btn"
                     onClick={() => handleChangeCurrentSession()}
                  >
                     <img
                        className="w-100 h-100 object-fit-contain"
                        src={editIcon}
                        alt=""
                     />
                  </button>
               )}
            </div>

            {/* BUTTONS */}
            <div className="d-flex justify-content-between align-items-center gap-3 btns">
               <Link to="/characters">
                  <button className="profile-button base-button rounded p-2">
                     <img className="w-100" src={profileIcon} alt="profile" />
                  </button>
               </Link>
               <Link to="#">
                  <button className="settings-button base-button rounded p-2">
                     <img className="w-100" src={settingsIcon} alt="settings" />
                  </button>
               </Link>
            </div>
         </div>
         <DemoVersionModal />
         <AddSessionCanvas />
         <SessionsListCanvas />
      </>
   );
}
