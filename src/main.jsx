import { StrictMode } from "react";
import "./assets/css/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
   <StrictMode>
      <BrowserRouter>
         <div className="body-container">
            <div className="bg-container">
               <img
                  src="src/assets/images/old-paper-texture.jpg"
                  className="texture"
               />
               <App />
            </div>
         </div>
      </BrowserRouter>
   </StrictMode>
);
