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

const isDev = true;

const initData = isDev
   ? "id=123446789&first_name=mister&username=propper&auth_date=1700000000&hash=56b755bbf32ff0fa1716476452b6973af80c040538ce766f956c630a6ba6160f"
   : window.Telegram.WebApp.initData;

if (initData) {
   login(initData);
}

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <div
               className="d-flex flex-column flex-grow-1 h-100 bg-container"
               style={{ padding: "5vh 0" }}
            >
               <img src={textureBg} alt="texture" className="texture" />
               <App />
            </div>
         </Provider>
      </BrowserRouter>
   </StrictMode>
);
