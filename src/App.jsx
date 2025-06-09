import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getPlayer } from "./store/slices/playerSlice.js";
import { getSessions } from "./store/slices/sessionSlice.js";
import { login } from "./store/slices/authorizationSlice";
import axios from "axios";
import { isTokenValid } from "./services/authService.js";

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
   const authStatus = useSelector((state) => state.authorization.status);
   //login
   useEffect(() => {
      window.Telegram.WebApp.ready();

      const raw = window.Telegram?.WebApp?.initData;

      if (!raw || typeof raw !== "string") {
         console.log("❌ Не удалось получить initData");
         return;
      }

      if (
         playerStatus === "succeeded" &&
         localStorage.getItem("token") &&
         isTokenValid(localStorage.getItem("token"))
      ) {
         console.log(
            "❌ Пользователь уже авторизован, токен все еще действителен. playerStatus:" +
               playerStatus
         );
         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${localStorage.getItem("token")}`;
         return;
      }

      if (playerStatus === "idle" || playerStatus === "loading") {
         console.log("❌ Player еще не получен или в процессе проверки");
         return;
      }

      console.log("▶️ Отправляем ровно эту строку initData:", raw);
      login(raw);

      axios.defaults.headers.common[
         "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
   }, [playerStatus]);

   //getting player
   useEffect(() => {
      if (
         playerStatus === "idle" ||
         (playerStatus === "failed" && authStatus === "succeeded")
      ) {
         dispatch(getPlayer());
      }
   }, [dispatch, playerStatus, authStatus]);

   //fetching data
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   const sessionStatus = useSelector((state) => state.session.status);
   useEffect(() => {
      if (!localStorage.getItem("token") || playerStatus !== "succeeded") {
         return;
      }
      if (raceStatus === "idle") {
         dispatch(getRaces());
      }
   }, [dispatch, raceStatus, playerStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token") || playerStatus !== "succeeded") {
         return;
      }
      if (profStatus === "idle") {
         dispatch(getProfessions());
      }
   }, [dispatch, profStatus, playerStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token") || playerStatus !== "succeeded") {
         return;
      }
      if (charStatus === "idle") {
         dispatch(getCharacters());
      }
   }, [dispatch, charStatus, playerStatus]);

   useEffect(() => {
      if (!localStorage.getItem("token") || playerStatus !== "succeeded") {
         return;
      }
      if (sessionStatus === "idle") {
         dispatch(getSessions());
      }
   }, [dispatch, sessionStatus, playerStatus]);

   const isLoading =
      raceStatus === "loading" ||
      profStatus === "loading" ||
      charStatus === "loading" ||
      playerStatus === "loading" ||
      sessionStatus === "loading" ||
      authStatus === "loading";

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
