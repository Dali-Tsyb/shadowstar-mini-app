import { StrictMode } from "react";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import textureBg from "./assets/images/old-paper-texture.webp";
import { store } from "./store";
import { Provider } from "react-redux";
import "./config/i18n";

export default function Root() {
   return (
      <BrowserRouter>
         <Provider store={store}>
            <div
               className="d-flex flex-column h-100 bg-container"
               style={{ padding: "10vh 0 7vh 0" }}
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
