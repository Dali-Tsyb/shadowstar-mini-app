import { StrictMode } from "react";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import textureBg from "./assets/images/old-paper-texture.webp";
import { store } from "./store";
import { Provider } from "react-redux";
import "./config/i18n";
import { login } from "./services/authService";

//authorization
const initData = window.Telegram
   ? "id=123446789&first_name=mister&username=propper&auth_date=1700000000&hash=56b755bbf32ff0fa1716476452b6973af80c040538ce766f956c630a6ba6160f"
   : {
        id: window.Telegram.WebApp.id,
        first_name: window.Telegram.WebAppUser.first_name,
        username: window.Telegram.WebAppUser.username,
        auth_date: window.Telegram.WebAppInitData.auth_date,
        hash: window.Telegram.WebAppInitData.hash,
     };

if (initData) {
   login(initData);
}

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <div
               className="d-flex flex-column flex-grow-1 h-100 bg-container"
               style={{ padding: "7vh 0" }}
            >
               <img src={textureBg} alt="texture" className="texture" />
               <App />
            </div>
         </Provider>
      </BrowserRouter>
   </StrictMode>
);
