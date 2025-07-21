import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { themes } from "../utils/themeConfig";

const Header = ({ theme, changeTheme, onSearch, searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 ${theme.colors.cardBg} shadow-lg backdrop-blur-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-lg ${theme.colors.primary} flex items-center justify-center`}
            >
              <i className="fas fa-film text-white text-xl"></i>
            </div>
            <h1 className={`text-2xl font-bold ${theme.colors.text}`}>
              Film<span className={theme.colors.accent}>Hub</span>
            </h1>
          </div>
          {/* Search Bar */}
          <form onSubmit={onSearch} className="flex-1 max-w-md mx-4 sm:mx-8">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Film ara..."
              className={`${theme.colors.cardBg} ${theme.colors.text} placeholder-gray-400`}
            />
          </form>
          {/* Theme Selector (Desktop) */}
          <div className="hidden sm:flex items-center space-x-2">
            {Object.entries(themes).map(([key, themeData]) => (
              <Button
                key={key}
                onClick={() => changeTheme(key)}
                className={
                  theme.name === themeData.name
                    ? `${theme.colors.primary} text-white`
                    : `${theme.colors.cardBg} ${theme.colors.text} hover:opacity-80`
                }
              >
                {themeData.name}
              </Button>
            ))}
          </div>
          {/* Hamburger Menu Button (Mobile) */}
          <div className="sm:hidden flex items-center">
            <Button
              onClick={toggleMenu}
              className={`${theme.colors.cardBg} ${theme.colors.text} p-2 rounded-lg`}
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
            </Button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-gray-800/90 backdrop-blur-sm px-4 py-2">
            {Object.entries(themes).map(([key, themeData]) => (
              <Button
                key={key}
                onClick={() => {
                  changeTheme(key);
                  setIsMenuOpen(false); // Menüyü kapat
                }}
                className={`w-full text-left py-2 px-4 my-1 rounded-lg ${
                  theme.name === themeData.name
                    ? `${theme.colors.primary} text-white`
                    : `${theme.colors.cardBg} ${theme.colors.text} hover:opacity-80`
                }`}
              >
                {themeData.name}
              </Button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;