import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage";

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <div className="body-container">
         <div className="bg-container">
            <img src="src/assets/old-paper-texture.jpg" className="texture" />
            <HomePage />
         </div>
      </div>
   </StrictMode>
);
