import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../store/slices/authorizationSlice";

export default function WebLoginPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [widgetLoaded, setWidgetLoaded] = useState(false);

   useEffect(() => {
      window.onTelegramAuth = async (user) => {
         const authParams = {
            id: user.id,
            first_name: user.first_name || "",
            last_name: user.last_name || null,
            username: user.username || null,
            photo_url: user.photo_url || null,
            auth_date: user.auth_date,
            hash: user.hash,
         };
         dispatch(
            login({
               initData: authParams,
               mode: "web",
            })
         )
            .unwrap()
            .then(() => {
               navigate("/");
            });
      };
      if (
         !widgetLoaded &&
         !document.querySelector(
            'script[src^="https://telegram.org/js/telegram-widget.js?22"]'
         )
      ) {
         const script = document.createElement("script");
         script.src = "https://telegram.org/js/telegram-widget.js?22";
         script.async = true;
         script.setAttribute("data-telegram-login", "Shadowstar_master_bot");
         script.setAttribute("data-size", "large");
         script.setAttribute("data-radius", "10");
         script.setAttribute("data-request-access", "write");
         script.setAttribute("data-userpic", "false");
         script.setAttribute("data-lang", "ru");
         script.setAttribute("data-onauth", "onTelegramAuth(user)");
         script.onload = () => setWidgetLoaded(true);

         document.getElementById("telegram-login-widget").appendChild(script);
      }
   }, [dispatch, navigate, widgetLoaded]);

   return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
         <div className="mb-5 fw-bold fs-5 text-center">
            Авторизуйся через Telegram,
            <br /> чтобы начать приключение!
         </div>
         <div id="telegram-login-widget" />
      </div>
   );
}
