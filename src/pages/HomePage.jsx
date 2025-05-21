import "./home.css";
import React, { useState } from "react";

function HomePage() {
   const [role, setRole] = useState("master");

   return (
      <>
         <div
            className="d-flex flex-column gap-3 h-100 justify-content-between"
            style={{
               alignItems: "stretch",
            }}
         >
            <div className="title-container">
               <img
                  src="/src/assets/title-bg.webp"
                  alt="title bg"
                  className="w-100"
               />
               <h1 className="title-text d-flex justify-content-center align-items-center w-100 h-100">
                  D&D
               </h1>
            </div>
            <div
               className="d-flex justify-content-center align-items-center rounded"
               style={{ border: "3px solid #382610" }}
            >
               <button
                  className={
                     role === "player"
                        ? "role-button p-2 active"
                        : "role-button p-2"
                  }
                  style={{ borderRight: "3px solid #382610" }}
                  onClick={() => setRole("player")}
               >
                  Игрок
               </button>
               <button
                  className={
                     role === "master"
                        ? "role-button p-2 active"
                        : "role-button p-2"
                  }
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
                  className="w-100 rounded bg-transparent fw-semibold game-code-input p-2"
                  style={{ border: "3px solid #382610" }}
               />
            </div>
            <div className="home-map-container">
               <img
                  src="/src/assets/home-map-img.webp"
                  alt="map"
                  className="home-map"
               />
            </div>
            <div className="d-flex justify-content-between align-items-center gap-3">
               <button className="profile-button rounded p-2">
                  <img
                     className="w-100"
                     src="/src/assets/profile-icon.webp"
                     alt="profile"
                  />
               </button>
               <button className="settings-button rounded p-2">
                  <img
                     className="w-100"
                     src="/src/assets/settings-icon.webp"
                     alt="settings"
                  />
               </button>
            </div>
            <div>
               <button className="donate-button w-100 text-uppercase fw-bold p-2 rounded">
                  Поддержать проект
               </button>
            </div>
         </div>
      </>
   );
}

export default HomePage;
