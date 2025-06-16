import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./config/i18n";

import textureBg from "./assets/images/background/old-paper-texture.webp";
import "./assets/css/common/index.css";

import App from "./App";
import { store } from "./store";

export default function Root() {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <div
               className="d-flex flex-column h-100 bg-container"
               style={{ padding: "12vh 0 7vh 0" }}
            >
               <img src={textureBg} alt="texture" className="texture" />
               <App />
            </div>
         </Provider>
      </BrowserRouter>
   );
}

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <Root />
   </StrictMode>
);
