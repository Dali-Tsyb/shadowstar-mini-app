import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRaces } from "./store/slices/raceSlice";
import { getProfessions } from "./store/slices/professionSlice";
import { getCharacters } from "./store/slices/characterSlice";
import { getPlayer } from "./store/slices/playerSlice.js";
import { getSessions } from "./store/slices/sessionSlice.js";
import { login, updateAuthStatus } from "./store/slices/authorizationSlice";
import axios from "axios";
import { isTokenValid } from "./services/authService.js";
import { getLevels } from "./store/slices/levelSlice.js";

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
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
         const botUsername = "Shadowstar_master_bot";
         const miniAppUrl = encodeURIComponent(window.location.origin + "/");
         const deepLink = `tg://resolve?domain=${botUsername}&start=webapp_${miniAppUrl}`;
         const fallbackLink = `https://t.me/${botUsername}?start=webapp_${miniAppUrl}`;
         window.location.href = deepLink;
         setTimeout(() => {
            window.location.href = fallbackLink;
         }, 2000);
         return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (playerStatus === "idle" && authStatus !== "succeeded") {
         dispatch(getPlayer())
            .unwrap()
            .then(() => dispatch(updateAuthStatus("succeeded")))
            .catch(() => {
               //if unauthorized, clear token and restart auth flow
               localStorage.removeItem("token");
               dispatch(updateAuthStatus("idle"));
               window.location.reload();
            });
      }
   }, [dispatch, playerStatus, authStatus]);

   useEffect(() => {
      const initData = window.Telegram.WebApp.initData;

      if (!initData) {
         console.log("initData not found");
         return;
      }

      dispatch(login(initData))
         .unwrap()
         .then((res) => {
            const token = res.data.access_token;
            localStorage.setItem("token", token);
            dispatch(updateAuthStatus("succeeded"));
            //redirect user back to browser app main page
            window.Telegram.WebApp.openLink("https://mini.shadstar.ru/");
         })
         .catch((err) => {
            console.error("Mini App auth failed", err);
         });
   }, [authStatus, dispatch]);

   //fetching data
   const raceStatus = useSelector((state) => state.race.status);
   const profStatus = useSelector((state) => state.profession.status);
   const charStatus = useSelector((state) => state.character.status);
   const sessionStatus = useSelector((state) => state.session.status);
   const levelStatus = useSelector((state) => state.level.status);

   useEffect(() => {
      if (authStatus === "succeeded") {
         if (raceStatus === "idle") dispatch(getRaces());
         if (profStatus === "idle") dispatch(getProfessions());
         if (charStatus === "idle") dispatch(getCharacters());
         if (sessionStatus === "idle") dispatch(getSessions());
         if (levelStatus === "idle") dispatch(getLevels());
      }
   }, [
      authStatus,
      raceStatus,
      profStatus,
      charStatus,
      sessionStatus,
      levelStatus,
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
