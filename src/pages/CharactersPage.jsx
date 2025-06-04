import "../assets/css/characters.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useRef, useState } from "react";
import { EffectCards } from "swiper/modules";
import backArrowIcon from "../assets/images/back-arrow.svg";
import arrowIcon from "../assets/images/arrow.svg";
import CharacterCard from "../components/CharacterCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
   selectCharacter,
   setCharacters,
} from "../store/slices/characterSlice.js";
import CreateCharacterCard from "../components/CreateCharacterCard.jsx";
import { addCharacter } from "../store/slices/characterSlice";

export default function CharacterPage() {
   const swiperRef = useRef(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const dispatch = useDispatch();

   const [editMode, setEditMode] = useState(false);
   const characters = useSelector((state) => state.character.charactersList);

   const selectedCharacter = useSelector(
      (state) => state.character.selectedCharacter
   );

   const handleSelect = () => {
      dispatch(selectCharacter(characters[activeIndex]));
   };

   const handleAddCharacter = () => {
      setEditMode(true);
      dispatch(setCharacters([...characters, { name: "" }]));
      setTimeout(() => {
         while (
            swiperRef.current &&
            swiperRef.current.realIndex < swiperRef.current.slides.length - 1
         ) {
            swiperRef.current.slideNext();
         }
      }, 200);
   };

   const handleDeleteCharacter = () => {
      setEditMode(false);
      dispatch(setCharacters(characters.slice(0, -1)));
   };

   const handleSendCharacter = (form) => {
      dispatch(addCharacter(form));
      setEditMode(false);
   };

   return (
      <>
         <div className="d-flex flex-column justify-content-center align-items-center h-100 position-relative">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center p-3 pb-0 header-btns">
               <a href="/">
                  <button className="base-button brown-bg rounded">
                     <img className="w-100" src={backArrowIcon} alt="back" />
                  </button>
               </a>

               {!editMode && (
                  <button
                     className="base-button brown-bg beige-text rounded"
                     onClick={handleAddCharacter}
                  >
                     + Новый персонаж
                  </button>
               )}
               {editMode &&
                  characters.length > 0 &&
                  !characters[characters.length - 1].id && (
                     <button
                        className="base-button beige-text brown-bg rounded"
                        onClick={handleDeleteCharacter}
                     >
                        Отменить
                     </button>
                  )}
            </div>
            {/* LOADING */}
            {useSelector((state) => state.character.status) === "loading" && (
               <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center brown-text fw-bold no-chars-text">
                  Загрузка...
               </div>
            )}
            {/* ERROR */}
            {useSelector((state) => state.character.status) === "failed" && (
               <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center brown-text fw-bold no-chars-text">
                  Ошибка загрузки персонажей :(
               </div>
            )}
            {/* FULFILLED & NO CHARACTERS */}
            {useSelector((state) => state.character.status) === "succeeded" &&
               characters.length === 0 && (
                  <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center text-center brown-text fw-bold no-chars-text">
                     Создай своего первого героя, <br /> кликнув кнопку сверху!
                  </div>
               )}
            {/* FULFILLED & CHARACTERS */}
            {characters && characters.length > 0 && (
               <Swiper
                  modules={[Navigation, EffectCoverflow, EffectCards]}
                  effect={"cards"}
                  cardsEffect={{
                     perSlideOffset: 10,
                     perSlideRotate: 1,
                     slideShadows: false,
                  }}
                  grabCursor={true}
                  loop={false}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="w-100 h-100 px-3"
               >
                  {characters.map((character, index) => (
                     <SwiperSlide key={index} className=" w-100">
                        {!editMode && (
                           <CharacterCard
                              character={character}
                              index={index}
                              selectedCharacter={selectedCharacter}
                              setSelectedCharacter={handleSelect}
                           />
                        )}
                        {editMode && (
                           <CreateCharacterCard
                              character={character}
                              index={index}
                              sendCharacter={handleSendCharacter}
                           />
                        )}
                     </SwiperSlide>
                  ))}
               </Swiper>
            )}
            {/* NAVIGATION */}
            {characters && characters.length > 0 && (
               <div className="d-flex justify-content-between align-items-center footer-btns p-3 pt-0">
                  <button
                     className="base-button p-0 brown-bg rounded"
                     onClick={() => swiperRef.current?.slidePrev()}
                  >
                     <img
                        className="w-100 m-auto"
                        src={arrowIcon}
                        alt="prev"
                        style={{ transform: "rotate(270deg)" }}
                     />
                  </button>
                  <div
                     className="d-flex gap-1 justify-content-center align-items-center w-100 overflow-hidden slide-count"
                     style={{ maxWidth: "50%" }}
                  >
                     <span className="brown-text">{activeIndex + 1 || 1}</span>
                     <span className="brown-text">/</span>
                     <span className="brown-text">{characters.length}</span>
                  </div>
                  <button
                     className="base-button p-0 brown-bg rounded"
                     onClick={() => swiperRef.current?.slideNext()}
                  >
                     <img
                        className="w-100 m-auto"
                        src={arrowIcon}
                        alt="next"
                        style={{ transform: "rotate(90deg)" }}
                     />
                  </button>
               </div>
            )}
         </div>
      </>
   );
}
