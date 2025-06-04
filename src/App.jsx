import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRaces } from "./store/slices/raceSlice";
import { loadProfessions } from "./store/slices/professionSlice";
import { loadCharacters } from "./store/slices/characterSlice";

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

   const dispatch = useDispatch();
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (raceStatus === "idle") {
         dispatch(loadRaces());
      }
      if (profStatus === "idle") {
         dispatch(loadProfessions());
      }
      if (charStatus === "idle") {
         dispatch(loadCharacters());
      }
   }, [dispatch, raceStatus, profStatus, charStatus]);

   return (
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/characters" element={<CharactersPage />} />
      </Routes>
   );
}
