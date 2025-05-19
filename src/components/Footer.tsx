import { useEffect, useRef, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import {
  FaChevronDown,
  FaInstagram,
  FaTwitch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks1 = [
    "Contact",
    "Careers",
    "Règles de la communauté",
    "Subscribe",
  ];
  const navLinks2 = [
    "Corporate",
    "Privacy",
    "Paramètres des cookies",
    "Politique en matière de cookies",
    "Legal",
    "Do Not Sell or Share My Personal Information",
  ];
  const locations = ["New York", "London", "Paris", "Bogota"];
  const socialIcons = [FaTwitter, FaInstagram, FaYoutube, FaTwitch];

  const handleLangChange = (lang: string) => {
    setSelectedLang(lang);
    setLangOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <footer className="bg-black text-white w-full default-font px-4 sm:px-8">
      <div className="flex flex-wrap justify-between items-center py-8 gap-6">
        <div className="h-18 w-12">
          <div className="h-4/5 flex bg-red-700 justify-center items-center font-bold text-3xl">
            18
          </div>
          <div className="bg-white text-black h-1/5 text-[10px] text-center font-extralight">
            pegi.info
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img src="/PS6_logo.png" alt="PS6" className="w-20 object-contain" />
          <img
            src="/XBOX_logo.png"
            alt="XBOX"
            className="w-24 object-contain"
          />
        </div>

        <div>
          <img
            src="./rockstar.png"
            alt="Rockstar"
            className="w-12 h-12 object-contain"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-6 gap-4">
        <div className="flex flex-wrap gap-6 text-sm">
          {navLinks1.map((link) => (
            <a key={link} href="#" className="hover:text-gray-300">
              {link}
            </a>
          ))}
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLangOpen(!langOpen)}
            className="flex items-center gap-2 text-sm hover:text-gray-300"
          >
            <CiGlobe size={16} />
            <span>{selectedLang}</span>
            <FaChevronDown size={16} />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 bg-black border border-gray-700 rounded shadow-md z-10">
              <button
                onClick={() => handleLangChange("English")}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
              >
                English
              </button>
              <button
                onClick={() => handleLangChange("Nepali")}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-800"
              >
                Nepali
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between py-10 gap-6 text-xs">
        <div className="flex flex-wrap gap-4">
          {navLinks2.map((link) => (
            <a key={link} href="#" className="hover:text-gray-300">
              {link}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          {socialIcons.map((Icon, i) => (
            <a key={i} href="#" className="hover:text-gray-300">
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between py-8 text-sm gap-4">
        <span>Rockstar Games</span>
        <div className="flex flex-wrap gap-6">
          {locations.map((loc) => (
            <a key={loc} href="#" className="hover:text-gray-300">
              {loc}
            </a>
          ))}
        </div>
        <span>MCMXCVIII</span>
      </div>
    </footer>
  );
}
