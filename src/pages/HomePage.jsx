import { Link } from "react-router-dom";
import "../assets/css/home.css";
import { useState } from "react";
import titleBg from "../assets/images/title-bg.webp";
import homeMap from "../assets/images/home-map-img.webp";
import profileIcon from "../assets/images/profile-icon.webp";
import settingsIcon from "../assets/images/settings-icon.webp";

function HomePage() {
   const [role, setRole] = useState("master");

   return (
      <>
         <div
            className="d-flex flex-column gap-3 h-100 justify-content-between p-3"
            style={{
               alignItems: "stretch",
            }}
         >
            <div className="title-container">
               <img src={titleBg} alt="title bg" className="w-100" />
               <h1 className="title-text d-flex justify-content-center align-items-center w-100 h-100">
                  D&D
               </h1>
            </div>
            <div className="d-flex justify-content-center align-items-center rounded">
               <button
                  className={
                     role === "player"
                        ? "role-button brown-bg beige-text p-2"
                        : "role-button bg-transparent brown-text beige-bg p-2"
                  }
                  style={{
                     border: "2px solid #382610",
                     borderRadius: ".375rem 0 0 .375rem",
                  }}
                  onClick={() => setRole("player")}
               >
                  Игрок
               </button>
               <button
                  className={
                     role === "master"
                        ? "role-button brown-bg beige-text p-2"
                        : "role-button beige-bg brown-text p-2"
                  }
                  style={{
                     border: "2px solid #382610",
                     borderLeft: "none",
                     borderRadius: "0 .375rem .375rem 0",
                  }}
                  onClick={() => {
                     setRole("master");
                  }}
               >
                  Мастер
               </button>
            </div>
            <div className="d-flex justify-content-center align-items-center">
               <input
                  type="text"
                  placeholder="Введите код игры"
                  className="w-100 rounded bg-transparent fw-semibold brown-text game-code-input p-2 brown-border"
               />
            </div>
            <img
               src={homeMap}
               alt="map"
               className="brown-border rounded w-100"
            />
            <div className="d-flex justify-content-between align-items-center gap-3">
               <Link to="/characters">
                  <button className="profile-button base-button rounded p-2">
                     <img
                        className="w-100"
                        src={profileIcon}
                        alt="profile"
                     />
                  </button>
               </Link>

               <button className="settings-button base-button rounded p-2">
                  <img
                     className="w-100"
                     src={settingsIcon}
                     alt="settings"
                  />
               </button>
            </div>
            <div>
               <button
                  className="base-button brown-bg beige-text rounded w-100"
                  style={{ fontSize: "1rem" }}
               >
                  Поддержать проект
               </button>
            </div>
         </div>
      </>
   );
}

export default HomePage;
