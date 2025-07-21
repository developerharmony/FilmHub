import { useState, useEffect } from "react";
import { BASE_URL, API_KEY, categories } from "../utils/constants";

export const useMovies = (category = "popular", searchTerm = "", page = 1) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Kategori ismini al
        const categoryName = categories.find((c) => c.id === category)?.name || category;

        let url = searchTerm
          ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}&page=${page}&language=tr-TR`
          : `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}&language=tr-TR`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.success === false) {
          throw new Error(
            data.status_code === 34
              ? `"${searchTerm || categoryName}" için film bulunamadı.`
              : data.status_code === 7
              ? "API anahtarı geçersiz. Lütfen yapılandırmayı kontrol edin."
              : data.status_message || "Veri alınamadı."
          );
        }

        let filteredMovies = data.results || [];

        // Eğer arama terimi varsa ve kategori "popular" değilse, istemci tarafında filtreleme yap
        if (searchTerm && category !== "popular") {
          const categoryResponse = await fetch(
            `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}&language=tr-TR`
          );
          const categoryData = await categoryResponse.json();

          if (categoryData.success === false) {
            throw new Error(
              categoryData.status_code === 34
                ? `"${categoryName}" kategorisinde film bulunamadı.`
                : categoryData.status_code === 7
                ? "API anahtarı geçersiz. Lütfen yapılandırmayı kontrol edin."
                : categoryData.status_message || "Kategori verisi alınamadı."
            );
          }

          const categoryMovieIds = new Set(categoryData.results.map((movie) => movie.id));
          filteredMovies = filteredMovies.filter((movie) => categoryMovieIds.has(movie.id));

          // Eğer filtrelenmiş sonuç yoksa, kullanıcıya bilgi ver
          if (filteredMovies.length === 0) {
            throw new Error(
              `"${searchTerm}" için "${categoryName}" kategorisinde uygun film bulunamadı.`
            );
          }
        }

        if (filteredMovies.length === 0 && searchTerm) {
          throw new Error(`"${searchTerm}" için film bulunamadı.`);
        }

        setMovies(filteredMovies);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [category, searchTerm, page]);

  return { movies, totalPages, loading, error };
};