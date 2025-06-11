import React, { useEffect, useRef } from "react";

const TelegramLoginWidget = () => {
   const telegramRef = useRef(null);

   useEffect(() => {
      if (!telegramRef.current) return;

      telegramRef.current.innerHTML = "";

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.async = true;
      script.setAttribute("data-telegram-login", "Shadowstar_master_bot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-auth-url", "https://mini.shadstar.ru/api/auth/telegram");
      script.setAttribute("data-request-access", "write");

      telegramRef.current.appendChild(script);
   }, []);

   return <div ref={telegramRef}></div>;
};

export default TelegramLoginWidget;
