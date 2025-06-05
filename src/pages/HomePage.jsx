import { Link } from "react-router-dom";
import "../assets/css/home.css";
import { useEffect, useState } from "react";
import titleBg from "../assets/images/title-bg.webp";
import homeMap from "../assets/images/home-map-img.webp";
import profileIcon from "../assets/images/profile-icon.webp";
import settingsIcon from "../assets/images/settings-icon.webp";
import arrowIcon from "../assets/images/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { updateRole } from "../store/slices/playerSlice";
import DemoVersionModal from "../components/DemoVersionModal";

export default function HomePage() {
   const dispatch = useDispatch();
   

   //current user
   const player = useSelector((state) => state.player.currentPlayer);

   //current role
   const [role, setRole] = useState(null);
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
   const handleConnectToSession = (code) => {
      console.log(code);
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
                     handleRoleChange("master");
                  }}
               >
                  Мастер
               </button>
            </div>
            {/* GAME CODE INPUT */}
            <div className="d-flex justify-content-center align-items-center game-code-input">
               <input
                  type="number"
                  placeholder="Введите код игры"
                  className={`w-100 rounded bg-transparent fw-semibold brown-text brown-border ${
                     gameCode ? "pe-5" : ""
                  } `}
                  onChange={(e) => setGameCode(e.target.value)}
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
            {/* MAP */}
            <div className=" d-flex justify-content-center align-items-center home-map overflow-hidden rounded">
               <img src={homeMap} alt="map" className="brown-border rounded" />
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
            {/* SUPPORT BUTTON */}
            <div>
               <button className="base-button brown-bg beige-text rounded w-100 support-btn">
                  Поддержать проект
               </button>
            </div>
         </div>
         <DemoVersionModal />
      </>
   );
}
