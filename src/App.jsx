import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import { useEffect } from "react";

export default function App() {
   useEffect(() => {
      const setVH = () =>
         document.documentElement.style.setProperty(
            "--vh",
            `${window.innerHeight * 0.01}px`
         );
      setVH();
      window.addEventListener("resize", setVH);
      return () => window.removeEventListener("resize", setVH);
   }, []);

   return (
      <div
         className="d-flex flex-column flex-grow-1"
         style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/characters" element={<CharactersPage />} />
         </Routes>
      </div>
   );
}
