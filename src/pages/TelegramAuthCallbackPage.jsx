// TelegramAuthCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TelegramAuthCallback = () => {
   const navigate = useNavigate();

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const telegramData = Object.fromEntries(params.entries());

      axios
         .post(`${import.meta.env.VITE_API_URL}/auth/telegram`, telegramData)
         .then((res) => {
            localStorage.setItem("token", res.data.access_token);
            axios.defaults.headers.common[
               "Authorization"
            ] = `Bearer ${res.data.access_token}`;
            navigate("/");
         })
         .catch((err) => {
            console.error("Telegram auth failed", err);
            navigate("/login");
         });
   }, [navigate]);

   return <div>Авторизация...</div>;
};

export default TelegramAuthCallback;
