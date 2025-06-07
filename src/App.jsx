import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getSessions } from "./store/slices/sessionSlice.js";
import { getLevels } from "./store/slices/levelSlice.js";
import { getAbilities } from "./store/slices/abilitySlice.js";
import LoadingSpinner from "./components/LoadingSpinner";
import RequireAuth from "./components/RequireAuth.jsx";

export default function App() {
   const dispatch = useDispatch();

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

   //authentication
   const playerStatus = useSelector((state) => state.player.status);
   const authStatus = useSelector((state) => state.authorization.status);

   //fetching data
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   const sessionStatus = useSelector((state) => state.session.status);
   const levelStatus = useSelector((state) => state.level.status);
   const abilityStatus = useSelector((state) => state.ability.status);

   useEffect(() => {
      if (authStatus === "succeeded") {
         if (raceStatus === "idle") dispatch(getRaces());
         if (profStatus === "idle") dispatch(getProfessions());
         if (charStatus === "idle") dispatch(getCharacters());
         if (sessionStatus === "idle") dispatch(getSessions());
         if (levelStatus === "idle") dispatch(getLevels());
         if (abilityStatus === "idle") dispatch(getAbilities());
      }
   }, [
      authStatus,
      raceStatus,
      profStatus,
      charStatus,
      sessionStatus,
      levelStatus,
      abilityStatus,
      dispatch,
   ]);

   const isLoading =
      raceStatus === "loading" ||
      profStatus === "loading" ||
      charStatus === "loading" ||
      playerStatus === "loading" ||
      sessionStatus === "loading" ||
      authStatus === "loading";

   const HomePage = React.lazy(() => import("./pages/HomePage"));
   const CharactersPage = React.lazy(() => import("./pages/CharactersPage"));
   const AbilitiesPage = React.lazy(() => import("./pages/AbilitiesPage.jsx"));
   const InventoryPage = React.lazy(() => import("./pages/InventoryPage.jsx"));
   const WebLoginPage = React.lazy(() => import("./pages/WebLoginPage.jsx"));

   if (isLoading) {
      return (
         <div className="d-flex justify-content-center align-items-center h-100">
            <LoadingSpinner />
         </div>
      );
   }

   if (authStatus === "failed") {
      return (
         <div className="d-flex justify-content-center align-items-center h-100">
            <div>
               <div className="fw-bold" role="alert">
                  Ошибка авторизации :(
               </div>
            </div>
         </div>
      );
   }

   return (
      <Routes>
         <Route
            path="/web-login"
            element={
               <React.Suspense fallback={<LoadingSpinner />}>
                  <WebLoginPage />
               </React.Suspense>
            }
         ></Route>
         <Route
            path="/"
            element={
               <React.Suspense fallback={<LoadingSpinner />}>
                  <HomePage />
               </React.Suspense>
            }
         />
         <Route
            path="/characters"
            element={
               <RequireAuth>
                  <React.Suspense fallback={<LoadingSpinner />}>
                     <CharactersPage />
                  </React.Suspense>
               </RequireAuth>
            }
         />
         <Route
            path="/characters/:id/abilities"
            element={
               <RequireAuth>
                  <React.Suspense fallback={<LoadingSpinner />}>
                     <AbilitiesPage />
                  </React.Suspense>
               </RequireAuth>
            }
         />
         <Route
            path="/characters/:id/inventory"
            element={
               <RequireAuth>
                  <React.Suspense fallback={<LoadingSpinner />}>
                     <InventoryPage />
                  </React.Suspense>
               </RequireAuth>
            }
         />
      </Routes>
   );
}
