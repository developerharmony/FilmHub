import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CategoryFilter from "../components/CategoryFilter";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import Spinner from "../components/ui/Spinner";
import Card from "../components/ui/Card";
import { useMovies } from "../hooks/useMovies";
import { useTheme } from "../hooks/useTheme";
import { categories } from "../utils/constants";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const { theme, changeTheme } = useTheme();
  const { movies, totalPages, loading, error } = useMovies(selectedCategory, searchTerm, currentPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const categoryName = categories.find((c) => c.id === selectedCategory)?.name || "Filmler";

  const isSearchError = error && error.includes(`"${searchTerm}"`);

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 4000 });
    }
  }, [error]);

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-500 ${theme.colors.bg}`}>
      <Header
        theme={theme}
        changeTheme={changeTheme}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="w-full max-w-7xl mx-auto px-2 py-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          theme={theme}
        />
      </div>
      <main
        role="main"
        aria-label="Film listesi ve arama sonuçları"
        className="flex-grow w-full max-w-7xl mx-auto px-2 pb-8"
      >
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <Card
                key={index}
                className={`${theme.colors.cardBg} w-full max-w-[250px] mx-auto rounded-xl overflow-hidden shadow-lg animate-pulse box-border`}
              >
                <div className="relative aspect-[2/3] bg-gray-300 rounded-lg"></div>
                <div className="p-3 space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full py-8">
            <Card
              role="alert"
              aria-label="Hata mesajı"
              className={`${theme.colors.cardBg} p-4 max-w-md text-center shadow-lg`}
            >
              <i className="fas fa-exclamation-circle text-red-500 text-3xl mb-4"></i>
              <p className={`${theme.colors.text} mb-4 text-sm`}>{error}</p>
              {isSearchError && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("popular");
                    setCurrentPage(1);
                  }}
                  className={`${theme.colors.primary} text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition-transform duration-200`}
                >
                  Aramayı Sıfırla
                </button>
              )}
            </Card>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex items-center justify-center h-full py-8">
            <Card
              role="alert"
              aria-label="Sonuç bulunamadı mesajı"
              className={`${theme.colors.cardBg} p-4 max-w-md text-center shadow-lg`}
            >
              <i className="fas fa-film text-gray-500 text-3xl mb-4"></i>
              <p className={`${theme.colors.text} mb-4 text-sm`}>
                {searchTerm
                  ? `"${searchTerm}" için ${categoryName} kategorisinde sonuç bulunamadı.`
                  : `${categoryName} kategorisinde film bulunamadı.`}
              </p>
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("popular");
                    setCurrentPage(1);
                  }}
                  className={`${theme.colors.primary} text-white px-4 py-2 rounded-lg text-sm hover:scale-105 transition-transform duration-200`}
                >
                  Aramayı Sıfırla
                </button>
              )}
            </Card>
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className={`${theme.colors.text} text-center mb-4 text-sm`}>
                "{searchTerm}" için {categoryName} kategorisinde {movies.length} film bulundu.
              </p>
            )}
            <div
              role="list"
              aria-label="Film kartları listesi"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  theme={theme}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  theme={theme}
                />
              </div>
            )}
          </>
        )}
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Home;