import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "../services/authService";
import { getPlayer } from "../store/slices/playerSlice";
import { updateAuthStatus, login } from "../store/slices/authorizationSlice";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";

export default function RequireAuth({ children }) {
   const dispatch = useDispatch();
   const location = useLocation();

   const token = localStorage.getItem("token");
   const isInTelegram = !!window.Telegram?.WebApp?.initData;
   const authStatus = useSelector((state) => state.authorization.status);
   const playerStatus = useSelector((state) => state.player.status);

   useEffect(() => {
      const authenticate = async () => {
         if (isInTelegram) {
            window.Telegram.WebApp.ready();
            if (!token || !isTokenValid(token)) {
               const initData = window.Telegram.WebApp.initData;
               dispatch(login({ initData, mode: "miniapp" }));
            }
         } else {
            if (!token || !isTokenValid(token)) {
               return;
            }
         }

         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

         if (playerStatus === "idle" && authStatus !== "succeeded") {
            await dispatch(getPlayer()).unwrap();
            dispatch(updateAuthStatus("succeeded"));
         }
      };

      authenticate();
   }, [token, dispatch, authStatus, playerStatus, isInTelegram]);

   if (!token || !isTokenValid(token)) {
      return <Navigate to="/web-login" state={{ from: location }} replace />;
   }

   return children;
}
