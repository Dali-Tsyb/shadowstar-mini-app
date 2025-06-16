import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isTokenValid } from "../services/authService";
import { getPlayer } from "../store/slices/playerSlice";
import { updateAuthStatus, login } from "../store/slices/authorizationSlice";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function RequireAuth({ children }) {
   const dispatch = useDispatch();
   const location = useLocation();
   const navigate = useNavigate();

   const token = localStorage.getItem("token");
   const authStatus = useSelector((state) => state.authorization.status);
   const playerStatus = useSelector((state) => state.player.status);

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
      if (!initialized) return;

      const isInTelegram = !!window.Telegram?.WebApp?.initData;

      if (!token || !isTokenValid(token)) {
         if (isInTelegram) {
            const initData = window.Telegram?.WebApp?.initData;
            if (initData) {
               dispatch(login({ initData, mode: "miniapp" }));
            }
         } else {
            navigate("/web-login", { state: { from: location.pathname } });
            return;
         }
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
         dispatch(getPlayer()).unwrap();
         dispatch(updateAuthStatus("succeeded"));
      } catch (err) {
         console.warn("getPlayer failed (possibly deleted):", err);
         localStorage.removeItem("token");

         if (isInTelegram) {
            const initData = window.Telegram.WebApp.initData;
            if (initData) {
               dispatch(login({ initData, mode: "miniapp" }));
               dispatch(getPlayer());
            }
         } else {
            navigate("/web-login", { state: { from: location.pathname } });
         }
      }
   }, [
      initialized,
      token,
      dispatch,
      location.pathname,
      navigate,
      playerStatus,
      authStatus,
   ]);

   if (!initialized) {
      return <LoadingSpinner />;
   }

   if (!token && !window.Telegram?.WebApp?.initData) {
      return <Navigate to="/web-login" state={{ from: location }} replace />;
   }

   return children;
}
