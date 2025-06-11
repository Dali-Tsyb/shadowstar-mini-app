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
   const [isBrowser, setIsBrowser] = React.useState(false);

   //login
   useEffect(() => {
      if (authStatus === "succeeded") {
         return;
      }
      const checkAuth = () => {
         if (
            localStorage.getItem("token") &&
            isTokenValid(localStorage.getItem("token"))
         ) {
            if (playerStatus === "succeeded" || playerStatus === "loading") {
               return true;
            } else if (playerStatus === "failed") {
               return false;
            } else if (playerStatus === "idle") {
               dispatch(getPlayer())
                  .unwrap()
                  .then(() => {
                     return true;
                  })
                  .catch(() => {
                     return false;
                  });
            }
         } else {
            return false;
         }
      };

      //if user is successfully logged in, return
      if (checkAuth()) {
         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${localStorage.getItem("token")}`;
         dispatch(updateAuthStatus("succeeded"));
         return;
      }

      //find out whether we are in browser or in mobile app
      if (
         window.Telegram &&
         window.Telegram.WebApp &&
         window.Telegram.WebApp.initData
      ) {
         setIsBrowser(false);
         dispatch(login(window.Telegram.WebApp.initData))
            .unwrap()
            .then(() => {
               dispatch(updateAuthStatus("succeeded"));
               //redirect user back to browser app main page
               if (
                  URLSearchParams(window.location.search).get("mode") ===
                  "browser"
               ) {
                  window.Telegram.WebApp.openLink("https://mini.shadstar.ru/");
                  window.Telegram.WebApp.close();
               }
            })
            .catch(() => {
               console.log("Authentication in mini app failed");
            });
      } else {
         setIsBrowser(true);
      }
   }, [dispatch, playerStatus, authStatus, isBrowser]);

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
   const BrowserAuthPage = React.lazy(() => import("./pages/BrowserAuthPage"));

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
                  { isBrowser ? <BrowserAuthPage /> : <HomePage />}
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
