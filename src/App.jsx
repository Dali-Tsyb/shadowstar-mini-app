import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getPlayer } from "./store/slices/playerSlice.js";
import { getSessions } from "./store/slices/sessionSlice.js";

export default function App() {
   useEffect(() => {
      const setVH = () =>
         document.documentElement.style.setProperty(
            "--vh",
            `${window.innerHeight * 0.01}px`
         );
      setVH();
      window.addEventListener("resize", setVH);
      return () => window.removeEventListener("resize", setVH);
   }, []);

   //fetching data
   const dispatch = useDispatch();
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   const playerStatus = useSelector((state) => state.player.status);
   const sessionStatus = useSelector((state) => state.session.status);
   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (raceStatus === "idle") {
         dispatch(getRaces());
      }
      if (profStatus === "idle") {
         dispatch(getProfessions());
      }
      if (charStatus === "idle") {
         dispatch(getCharacters());
      }
      if (playerStatus === "idle") {
         dispatch(getPlayer());
      }
      if (sessionStatus === "idle") {
         dispatch(getSessions());
      }
   }, [
      dispatch,
      raceStatus,
      profStatus,
      charStatus,
      playerStatus,
      sessionStatus,
   ]);

   const HomePage = React.lazy(() => import("./pages/HomePage"));
   const CharactersPage = React.lazy(() => import("./pages/CharactersPage"));

   return (
      <Routes>
         <Route
            path="/"
            element={
               <React.Suspense
                  fallback={
                     <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                           <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                 Загрузка...
                              </span>
                           </div>
                        </div>
                     </div>
                  }
               >
                  <HomePage />
               </React.Suspense>
            }
         />
         <Route
            path="/characters"
            element={
               <React.Suspense
                  fallback={
                     <div className="d-flex justify-content-center align-items-center h-100">
                        <div>
                           <div className="spinner-border" role="status">
                              <span className="visually-hidden">
                                 Загрузка...
                              </span>
                           </div>
                        </div>
                     </div>
                  }
               >
                  <CharactersPage />
               </React.Suspense>
            }
         />
      </Routes>
   );
}
