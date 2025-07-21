import React from "react";

const Footer = ({ theme }) => {
  return (
    <footer
      className={`${theme.colors.cardBg} border-t border-gray-200 dark:border-gray-700`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div
              className={`w-8 h-8 rounded-lg ${theme.colors.primary} flex items-center justify-center`}
            >
              <i className="fas fa-film text-white"></i>
            </div>
            <h3 className={`text-xl font-bold ${theme.colors.text}`}>
              Film<span className={theme.colors.accent}>Hub</span>
            </h3>
          </div>
          <p className={`${theme.colors.text} opacity-70 mb-4`}>
            En popüler filmleri keşfedin
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/developerharmony"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.colors.text} hover:${theme.colors.accent} transition-colors duration-300`}
            >
              <i className="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.colors.text} hover:${theme.colors.accent} transition-colors duration-300`}
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.colors.text} hover:${theme.colors.accent} transition-colors duration-300`}
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
          <div
            className={`mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 ${theme.colors.text} opacity-50 text-sm`}
          >
            © 2025 FilmHub.
            {" "}
          <a
            href="https://github.com/developerharmony"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-semibold hover:${theme.colors.accent} hover:scale-105 transition-all duration-200`}
            aria-label="Harmony tarafından geliştirilmiştir, GitHub profiline git"
          >
            Harmony
          </a>{" "}
          tarafından geliştirilmiştir. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;