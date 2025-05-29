import { StrictMode } from "react";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import textureBg from "./assets/images/old-paper-texture.webp";

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <div className="bg-container">
            <img src={textureBg} alt="texture" className="texture" />
            <App />
         </div>
      </BrowserRouter>
   </StrictMode>
);
