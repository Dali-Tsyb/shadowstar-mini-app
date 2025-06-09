import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getPlayer } from "./store/slices/playerSlice.js";
import { getSessions } from "./store/slices/sessionSlice.js";
import { login } from "./services/authService";

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

   //auth
   const playerStatus = useSelector((state) => state.player.status);
   //login
   useEffect(() => {
      window.Telegram.WebApp.ready();

      const raw = window.Telegram?.WebApp?.initData;

      if (!raw || typeof raw !== "string") {
         console.error(
            "Не получилось получить строку initData из WebApp:",
            raw
         );
         return;
      }

      //если не удалось получить player
      if (playerStatus !== "failed") {
         console.error("Игрок не найден или аутентификация уже прошла");
         return;
      }

      console.log("▶️ Отправляем ровно эту строку initData:", raw);
      login(raw);
   }, [playerStatus]);

   //getting player
   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (playerStatus === "idle") {
         dispatch(getPlayer());
      }
   }, [dispatch, playerStatus]);

   //fetching data
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   const sessionStatus = useSelector((state) => state.session.status);
   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (raceStatus === "idle") {
         dispatch(getRaces());
      }
   }, [dispatch, raceStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (profStatus === "idle") {
         dispatch(getProfessions());
      }
   }, [dispatch, profStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token") || !playerStatus === "succeeded") {
         return;
      }
      if (charStatus === "idle") {
         dispatch(getCharacters());
      }
   }, [dispatch, charStatus, playerStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token")) {
         return;
      }
      if (sessionStatus === "idle") {
         dispatch(getSessions());
      }
   }, [dispatch, sessionStatus]);

   const isLoading =
      raceStatus === "loading" ||
      profStatus === "loading" ||
      charStatus === "loading" ||
      playerStatus === "loading" ||
      sessionStatus === "loading";

   const HomePage = React.lazy(() => import("./pages/HomePage"));
   const CharactersPage = React.lazy(() => import("./pages/CharactersPage"));

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

   if (!localStorage.getItem("token")) {
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
