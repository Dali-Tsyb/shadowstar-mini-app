import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { isTokenValid } from "../../services/authService";
import { getPlayer } from "../../store/slices/playerSlice";
import { updateAuthStatus, login } from "../../store/slices/authorizationSlice";

import LoadingSpinner from "./LoadingSpinner";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
   const dispatch = useDispatch();

   const authStatus = useSelector((state) => state.authorization.status);
   const playerStatus = useSelector((state) => state.player.status);

   const location = window.location.pathname;

   const [initialized, setInitialized] = useState(false);

   useEffect(() => {
      const init = async () => {
         const isInTelegram = !!window.Telegram?.WebApp?.initData;

         if (isInTelegram) {
            window.Telegram.WebApp.ready();
            await new Promise((resolve) => setTimeout(resolve, 100));
         }

         setInitialized(true);
      };

      init();
   }, []);

   useEffect(() => {
      if (
         !initialized ||
         authStatus === "succeeded" ||
         playerStatus === "loading"
      )
         return;

      const isInTelegram = !!window.Telegram?.WebApp?.initData;

      const authenticate = async () => {
         if (isInTelegram) {
            window.Telegram.WebApp.ready();
            if (
               !localStorage.getItem("token") ||
               !isTokenValid(localStorage.getItem("token"))
            ) {
               const initData = window.Telegram.WebApp.initData;
               dispatch(login({ initData, mode: "miniapp" }));
            }
         } else {
            if (
               !localStorage.getItem("token") ||
               !isTokenValid(localStorage.getItem("token"))
            ) {
               return;
            }
         }

         axios.defaults.headers.common[
            "Authorization"
         ] = `Bearer ${localStorage.getItem("token")}`;

         if (playerStatus === "idle" && localStorage.getItem("token")) {
            await dispatch(getPlayer())
               .unwrap()
               .then(() => {
                  dispatch(updateAuthStatus("succeeded"));
               })
               .catch(() => {
                  localStorage.removeItem("token");
                  authenticate();
               });
         }
      };

      authenticate();
   }, [dispatch, authStatus, playerStatus, initialized]);

   if (!initialized) {
      return <LoadingSpinner />;
   }

   if (
      !localStorage.getItem("token") ||
      !isTokenValid(localStorage.getItem("token"))
   ) {
      return <Navigate to="/web-login" state={{ from: location }} replace />;
   }

   return children;
}
