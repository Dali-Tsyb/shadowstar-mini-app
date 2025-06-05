import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getPlayer } from "./store/slices/playerSlice.js";

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
   }, [dispatch, raceStatus, profStatus, charStatus, playerStatus]);

   const isLoading =
      raceStatus !== "succeeded" ||
      profStatus !== "succeeded" ||
      charStatus !== "succeeded" ||
      playerStatus !== "succeeded";

   if (isLoading) {
      return (
         <div className="d-flex justify-content-center align-items-center h-100">
            <div>
               <div className="spinner-border" role="status">
                  <span className="visually-hidden">Загрузка...</span>
               </div>
            </div>
         </div>
      );
   }

   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/characters" element={<CharactersPage />} />
      </Routes>
   );
}
