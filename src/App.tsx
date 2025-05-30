import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { FaCheck, FaHeart, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Footer from "./components/Footer";
import { useLanguage } from "./contexts/LanguageContext";
import type { Language } from "./types";
import { Trans, useTranslation } from "react-i18next";
import { getStars } from "./utils";

export default function App() {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [time, setTime] = useState({ hour: "00", minute: "00" });
  const [open, setOpen] = useState(false);
  const [stars, setStars] = useState<number>(1);
  const [viewBox, setViewBox] = useState("0 0 500 1000");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const { language, handleLanguageChange } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    const updateViewBox = () => {
      if (window.innerWidth < 640) {
        setViewBox("0 0 800 1500"); // Mobile
      } else {
        setViewBox("0 0 1000 500"); // Desktop
      }
    };

    updateViewBox();
    window.addEventListener("resize", updateViewBox);
    return () => window.removeEventListener("resize", updateViewBox);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      setTime({ hour, minute });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    setStars(5 - getStars());

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
      const tl = gsap.timeline();
      tl.to(".vi-mask-group", {
        scale: 30,
        transformOrigin: "50% 50%",
        duration: 0.8,
        delay: 0.5,
        ease: "power2.inOut",
        onComplete: function () {
          document.querySelector(".svgDiv")?.remove();
          setShowContent(true);
          this.kill();
        },
      });
    });

    mm.add("(min-width: 769px)", () => {
      const tl = gsap.timeline();
      tl.to(".vi-mask-group", {
        rotate: 80,
        scale: 5,
        y: "-500",
        transformOrigin: "50% 50%",
        duration: 1,
        delay: 1,
        ease: "power2.inOut",
      }).to(".vi-mask-group", {
        rotate: 90,
        scale: 10,
        y: "-1000",
        delay: -0.5,
        duration: 0.8,
        onComplete: function () {
          document.querySelector(".svgDiv")?.remove();
          setShowContent(true);
          this.kill();
        },
      });
    });

    return () => mm.kill(); // clean up on component unmount
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -0.5,
      ease: "Expo.easeInOut",
    });

    gsap.to(".avatar", {
      rotate: 0,
      duration: 1,
      top: 144,
      delay: -0.5,
      ease: "Expo.in",
    });

    gsap.to(".map", {
      rotate: 0,
      duration: 1.5,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".burger", {
      left: 25,
      duration: 1.5,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".rockstar", {
      right: 20,
      duration: 1.5,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".descBox", {
      top: 20,
      duration: 1.5,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });

    gsap.to(".star", {
      left: "18%",
      duration: 1.5,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const mouseEvent = e as MouseEvent;
      const xMove = (mouseEvent.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
    });
  }, [showContent]);

  return (
    <>
      <div className="svgDiv flex items-center justify-center h-screen w-full bg-black overflow-hidden">
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid slice"
          className="svg "
        >
          <defs>
            <mask id="vi-mask">
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="250"
                  fontFamily="Arial Black"
                  fill="white"
                  letterSpacing="-20"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>

          <g mask="url(#vi-mask)">
            {/* Sky - full background */}
            <image
              href="/sky.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />

            {/* Building - bottom half */}
            <image
              href="/building.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
      {showContent && (
        <>
          <div className="main rotate-12 scale-200 relative flex items-center justify-center h-screen max-w-screen overflow-hidden">
            <div className="absolute z-10 top-0 left-0 flex h-18 w-screen px-8 space-x-40">
              <div className="flex items-center space-x-3">
                <div className="burger w-10 h-full  flex flex-col justify-center space-y-1 absolute left-144">
                  <div className="md:h-2 h-1.5 bg-white md:w-10 w-8"></div>
                  <div className="md:h-2 h-1.5 bg-white md:w-10 w-8"></div>
                  <div className="md:h-2 h-1.5 bg-white md:w-6 w-5"></div>
                </div>
                <div className="relative" ref={dropdownRef}>
                  <div
                    className="md:ml-12 ml-10 md:w-10 w-8 md:h-9 h-7 bg-black rounded flex justify-center items-center cursor-pointer"
                    onClick={() => setOpen((prev) => !prev)}
                  >
                    <CiGlobe className="text-white text-lg" />
                  </div>

                  {open && (
                    <div className="absolute z-10 mt-2 bg-white rounded shadow-md p-2 min-w-[120px]">
                      {["English", "Nepali"].map((lang) => (
                        <div
                          key={lang}
                          onClick={() => {
                            handleLanguageChange(lang as Language);
                            setOpen(false);
                          }}
                          className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                        >
                          <span>{lang}</span>
                          {language === lang && (
                            <FaCheck className="text-green-500 text-sm" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <img
                src="./vi.png"
                className="absolute md:top-2 top-4 left-1/2 transform -translate-x-1/2 md:w-20 md:h-20 w-12 h-12 object-contain overflow-hidden"
                loading="eager"
              />
              <div className="w-20 h-full text-2xl py-2 text-stroke -space-y-1.5">
                <div className="space-x-1  flex items-center">
                  <span className="text-4xl text-white">{time.hour}</span>
                  <span className="text-gray-400">{time.minute}</span>
                </div>
                <div className="text-[#11e891]">$003456789</div>
                <div className="text-[#e283cc] flex items-center space-x-2">
                  <FaHeart className="w-5" />
                  <span> 100</span>
                </div>
              </div>
            </div>
            <img
              src="/sky.png"
              className="sky md:scale-105 scale-120 absolute top-0 left-0 w-full h-full object-cover overflow-hidden"
              alt="Sky"
              loading="eager"
            />
            <img
              src="/building.png"
              className="building absolute top-0 left-0 w-full h-full object-cover overflow-hidden"
              alt="Building"
              loading="eager"
            />
            <div
              className="star hidden md:flex flex-col absolute text-white"
              style={{
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex space-x-1 text-xl">
                {[...Array(5)].map((_, i) =>
                  i < stars ? (
                    <FaStar key={i} className="text-yellow-400" />
                  ) : (
                    <FaStar key={i} className="text-white" />
                  )
                )}
              </div>
            </div>
            <div
              className=" text flex flex-col absolute text-[120px] font-bold text-white -space-y-10"
              style={{
                top: "45%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="mx-auto">grand</span>
              <span className="mx-auto md:pl-32">theft</span>
              <span className="mx-auto">auto</span>
            </div>

            <img
              src="./map.png"
              alt="Map"
              className="map md:block hidden absolute bottom-5 rotate-90 left-6 w-40 object-contain overflow-hidden"
              loading="eager"
            />

            <div className="rockstar md:flex hidden absolute bottom-8 right-144  flex-col items-end justify-center">
              <img
                src="./rockstar.png"
                alt="Rockstar"
                className="w-12 h-12 object-contain overflow-hidden"
                loading="eager"
              />
              <span className="text-white text-lg default-font font-bold">
                MCMXCVIII
              </span>
            </div>

            <img
              src="/avatar.png"
              className="avatar absolute rotate-12  left-0 md:top-144 w-full  h-full object-contain overflow-hidden"
              alt="Avatar"
              loading="eager"
            />
            <div className="absolute h-12 bottom-6 left-1/2 transform -translate-x-1/2 w-full flex justify-center space-x-8 items-center  object-contain">
              <img
                src="/PS6_logo.png"
                className="object-contain overflow-hidden w-20"
                alt="PS6"
                loading="eager"
              />
              <img
                src="/XBOX_logo.png"
                className="object-contain overflow-hidden w-24"
                alt="XBOX"
                loading="eager"
              />
            </div>

            <div
              className="md:flex hidden flex-col absolute text-white"
              style={{
                top: "70%",
                left: "36%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="h-28 w-24 border-[3px] border-white">
                <div className="h-4/5 flex justify-center items-center default-font font-extrabold text-6xl tracking-tighter p-1">
                  18
                </div>
                <div className="bg-white text-black h-1/5 default-font text-sm text-center font-extralight">
                  www.pegi.info
                </div>
              </div>
            </div>
            <div className="descBox absolute top-50 right-6 md:block hidden w-[220px]">
              <div className="flex flex-col h-[17rem] space-y-4 w-full bg-white  p-3 px-5">
                <h1
                  className={`text-[#e283cc] text-3xl text-stroke ${
                    language === "Nepali" && "nepali-font"
                  }`}
                >
                  <Trans i18nKey="welcome" components={{ br: <br /> }} />
                </h1>
                <hr className="w-14 border-[1.5px] border-gray-400" />
                <p className="default-font text-xs text-justify font-semibold">
                  {t("desc")}
                </p>
              </div>
              <div className="w-full h-28 bg-black flex justify-center items-center">
                <div className="border border-white h-3/5 w-[60%] p-[0.5px]">
                  <div className="bg-white font-bold justify-center items-center flex p-2 w-full h-3/5 default-font text-black text-center text-[7px]">
                    MAY CONTAIN CONTENT INAPPROPRIATE FOR CHILDREN
                  </div>
                  <div className="justify-center items-center flex p-2 w-full h-2/5 default-font text-white text-center text-[8px]">
                    <span>VISIT osrb.org for rating information</span>
                    <span className="border p-1 px-1.5 rounded-[73%_27%_70%_30%_/_55%_46%_54%_45%]">
                      OSRB
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="#"
                target="_blank"
                className="flex justify-between items-center py-2 px-1"
              >
                <span className="default-font font-bold text-xs uppercase">
                  {t("watch_trailer")}
                </span>
                <FaArrowRightLong className="text-black" />
              </a>
            </div>
          </div>
          <div className="bg-[#14121b] flex justify-center items-center md:py-32 py-24 text-white">
            <div className="md:w-3/5 w-4/5 flex md:flex-row flex-col md:space-y-0 space-y-10 items-center">
              <div className="official-logo flex-1">
                <img
                  src="/gta_logo.png"
                  className="object-contain overflow-hidden md:w-96 w-72"
                  alt="Official Logo"
                  loading="eager"
                />
              </div>
              <div className="flex-1 default-font space-y-4">
                <h1 className="md:text-3xl text-2xl md:font-medium font-bold">
                  BIENVENUE À LEONIDA
                </h1>
                <p>
                  Grand Theft Auto VI s’installe dans l’État de Leonida, qui
                  abrite les rues baignées par les néons de Vice City et plus
                  encore. Cet opus, le plus imposant et le plus immersif de la
                  série des Grand Theft Auto à ce jour, sera disponible en 2025
                  sur PlayStation 5 et Xbox Series X|S.
                </p>
                <p className="py-4">▶ Regarder la bande-annonce</p>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
