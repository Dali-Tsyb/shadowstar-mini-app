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
      const isInTelegram = !!window.Telegram?.WebApp?.initData;
      const token = localStorage.getItem("token");

      // ✅ 1. Auth via Mini App
      if (isInTelegram) {
         window.Telegram.WebApp.ready();

         const initData = window.Telegram.WebApp.initData;

         if (!token || !isTokenValid(token)) {
            dispatch(login(initData));
            return;
         }

         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

         if (playerStatus === "idle" && authStatus !== "succeeded") {
            dispatch(getPlayer())
               .unwrap()
               .then(() => dispatch(updateAuthStatus("succeeded")))
               .catch(() => {
                  dispatch(login(initData))
                     .unwrap()
                     .then(() => dispatch(getPlayer()));
               });
         }

         return;
      }

      // ✅ 2. Auth via Browser
      const params = new URLSearchParams(window.location.search);
      const hash = params.get("hash");

      if (hash && !token) {
         // User just came back from Telegram login
         const userData = Object.fromEntries(params.entries());

         axios
            .post(`${import.meta.env.VITE_API_URL}/auth/telegram`, userData)
            .then((res) => {
               const token = res.data.access_token;
               localStorage.setItem("token", token);
               axios.defaults.headers.common[
                  "Authorization"
               ] = `Bearer ${token}`;
               dispatch(getPlayer());
               window.history.replaceState({}, "", "/"); // Clean up URL
            })
            .catch((err) => {
               console.error("Telegram browser auth failed", err);
            });

         return;
      }

      if (!token || !isTokenValid(token)) {
         const redirectUrl = encodeURIComponent(window.location.href);
         const botUsername = "Shadowstar_master_bot";
         window.location.href = `https://oauth.telegram.org/auth?bot=${botUsername}&origin=${redirectUrl}&embed=0`;
         return;
      }

      // ✅ 3. Token exists and is valid (Browser)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (playerStatus === "idle" && authStatus !== "succeeded") {
         dispatch(getPlayer())
            .unwrap()
            .then(() => dispatch(updateAuthStatus("succeeded")));
      }
   }, [dispatch, playerStatus, authStatus]);

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
