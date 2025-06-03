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
import { selectCharacter } from "../store/slices/characterSlice.js";

export default function CharacterPage() {
   const swiperRef = useRef(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const dispatch = useDispatch();

   const characters = useSelector((state) => state.character.characters);

   const selectedCharacter = useSelector(
      (state) => state.character.selectedCharacter
   );

   const handleSelect = () => {
      dispatch(selectCharacter(characters[activeIndex]));
   };

   const addCharacter = () => {
      //add to store
      characters.push({ name: "Новый персонаж", class: "Человек" });
      //show its slide
      swiperRef.current.slideTo(characters.length - 1);
   };

   return (
      <>
         <div className="d-flex flex-column justify-content-center align-items-center h-100 position-relative">
            <div className="d-flex justify-content-between align-items-center p-3 pb-0 header-btns">
               <a href="/">
                  <button className="base-button brown-bg rounded">
                     <img className="w-100" src={backArrowIcon} alt="back" />
                  </button>
               </a>

               <button
                  className="base-button brown-bg beige-text rounded"
                  onClick={addCharacter}
               >
                  + Новый персонаж
               </button>
            </div>

            <Swiper
               modules={[Navigation, EffectCoverflow, EffectCards]}
               effect={"cards"}
               cardsEffect={{
                  perSlideOffset: 10,
                  perSlideRotate: 1,
                  slideShadows: false,
               }}
               grabCursor={true}
               loop={true}
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
               className="w-100 h-100 px-3"
            >
               {characters.map((character, index) => (
                  <SwiperSlide key={index} className=" w-100">
                     <CharacterCard
                        character={character}
                        index={index}
                        selectedCharacter={selectedCharacter}
                        setSelectedCharacter={handleSelect}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>

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
         </div>
      </>
   );
}
