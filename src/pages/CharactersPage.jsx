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
import characterAvatar from "../assets/images/character-avatar.png";
import arrowIcon from "../assets/images/arrow.svg";

const characters = [
   { name: "Крыса Лариса", class: "Зверь" },
   { name: "Пэлиас", class: "Эльф" },
   { name: "Талала", class: "Гном" },
   { name: "Эрик Пэнисов", class: "Гном" },
   { name: "Капучин", class: "Бес" },
   { name: "Миша", class: "Бес" },
   { name: "Дан Балан", class: "Вампир" },
   { name: "Юлиан", class: "Великан" },
   { name: "Вампирбек", class: "Вампир" },
   { name: "Ангелин", class: "Падший ангел" },
];

export default function CharacterPage() {
   const swiperRef = useRef(null);
   const [activeIndex, setActiveIndex] = useState(0);
   return (
      <>
         <div className="d-flex flex-column justify-content-between align-items-stretch h-100 w-100">
            <div className="d-flex justify-content-between align-items-center grid-area-navigation p-3 pb-0">
               <a href="/">
                  <button
                     className="base-button brown-bg rounded p-1"
                     style={{ width: "2rem", height: "2rem" }}
                  >
                     <img
                        className="w-100"
                        src={backArrowIcon}
                        alt="back"
                     />
                  </button>
               </a>

               <button className="base-button brown-bg beige-text rounded">
                  + Новый персонаж
               </button>
            </div>

            <Swiper
               modules={[Navigation, EffectCoverflow, EffectCards]}
               effect={"cards"}
               grabCursor={true}
               loop={false}
               onSwiper={(swiper) => (swiperRef.current = swiper)}
               onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
               className="p-3 w-100 h-100"
            >
               {characters.map((character, index) => (
                  <SwiperSlide key={index} className=" w-100">
                     <div
                        className="blocks-container h-100 w-100 brown-border rounded dark-beige-bg overflow-hidden"
                        style={{ boxShadow: "0 0 0.5rem #382610" }}
                     >
                        <div
                           className="grid-area-name brown-border p-2 beige-bg d-flex justify-content-center align-items-center"
                           style={{ borderRadius: "0.375rem 0 0 0" }}
                        >
                           {character.name}
                        </div>
                        <div
                           className="grid-area-class brown-border p-2 brown-bg beige-text text-uppercase text-center fw-bold d-flex justify-content-center align-items-center"
                           style={{ borderRadius: "0 0.375rem 0 0" }}
                        >
                           {character.class}
                        </div>
                        <div className="grid-area-avatar brown-border overflow-hidden dark-beige-bg">
                           <img
                              style={{
                                 minWidth: "100%",
                                 minHeight: "100%",
                                 objectFit: "cover",
                                 objectPosition: "center",
                                 display: "block",
                                 width: "100%",
                              }}
                              src={characterAvatar}
                              alt="avatar"
                           />
                        </div>
                        <div className="d-flex flex-column justify-content-between align-items-center grid-area-characteristics brown-border px-2 py-3 beige-bg">
                           <div className="characteristics">
                              <span>+1</span>
                              <span>ЛВК</span>
                           </div>
                           <div className="characteristics">
                              <span>-2</span>
                              <span>СИЛ</span>
                           </div>
                           <div className="characteristics">
                              <span>-1</span>
                              <span>ВНС</span>
                           </div>
                           <div className="characteristics">
                              <span>-2</span>
                              <span>ИНТ</span>
                           </div>
                           <div className="characteristics">
                              <span>0</span>
                              <span>ХРЗ</span>
                           </div>
                           <div className="characteristics">
                              <span>0</span>
                              <span>МДР</span>
                           </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center grid-area-stats brown-border px-2 py-1 beige-bg">
                           <div className="stats">
                              <span className="fw-bold beige-text">17</span>
                           </div>
                           <div className="stats">
                              <span className="fw-bold beige-text">39</span>
                           </div>
                           <div className="stats">
                              <span className="fw-bold beige-text">29</span>
                           </div>
                        </div>
                        <button className="grid-area-abilities base-button brown-bg beige-text d-flex align-items-center justify-content-center">
                           Способности
                        </button>
                        <button className="grid-area-inventory base-button brown-bg beige-text d-flex align-items-center justify-content-center">
                           Инвентарь
                        </button>
                        <button
                           className="grid-area-edit base-button brown-bg beige-text w-100"
                           style={{ borderRadius: "0 0 0.375rem 0.375rem" }}
                        >
                           Редактировать
                        </button>
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>

            <div className="d-flex flex-column gap-1 p-3 pt-0">
               <div className="grid-area-quantity d-flex justify-content-between align-items-center">
                  <button
                     className="base-button brown-bg rounded p-1"
                     style={{ width: "2rem", height: "2rem" }}
                     onClick={() => swiperRef.current?.slidePrev()}
                  >
                     <img
                        className="w-100"
                        src={arrowIcon}
                        alt="prev"
                        style={{ transform: "rotate(270deg)" }}
                     />
                  </button>
                  <div
                     className="d-flex gap-1 justify-content-center align-items-center w-100 overflow-hidden"
                     style={{ maxWidth: "50%" }}
                  >
                     <span className="brown-text">{activeIndex + 1 || 1}</span>
                     <span className="brown-text">/</span>
                     <span className="brown-text">{characters.length}</span>
                  </div>
                  <button
                     className="base-button brown-bg rounded p-1"
                     style={{ width: "2rem", height: "2rem" }}
                     onClick={() => swiperRef.current?.slideNext()}
                  >
                     <img
                        className="w-100"
                        src={arrowIcon}
                        alt="next"
                        style={{ transform: "rotate(90deg)" }}
                     />
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}
