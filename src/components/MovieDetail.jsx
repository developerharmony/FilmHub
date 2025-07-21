import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Spinner from "./ui/Spinner";
import Footer from "./Footer";
import { BASE_URL, API_KEY, IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";

const MovieDetail = ({ movieId, theme }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=tr-TR`).then((res) => res.json()),
          fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then((res) => res.json()),
          fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`).then((res) => res.json()),
        ]);
        if (movieData.success === false) {
          throw new Error(
            movieData.status_code === 34
              ? "Bu film bulunamadı. Lütfen başka bir film seçin."
              : movieData.status_code === 7
              ? "API anahtarı geçersiz. Lütfen yapılandırmayı kontrol edin."
              : movieData.status_message || "Film detayları yüklenemedi."
          );
        }
        setMovie({
          ...movieData,
          credits: creditsData,
          videos: videosData,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className={`flex flex-col min-h-screen ${theme.colors.bg}`}>
        <main className="flex-grow flex items-center justify-center">
          <Spinner />
        </main>
        <Footer theme={theme} />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className={`flex flex-col min-h-screen ${theme.colors.bg}`}>
        <main className="flex-grow flex items-center justify-center">
          <Card className={`${theme.colors.cardBg} p-4 sm:p-6 max-w-md text-center shadow-lg`}>
            <i className="fas fa-exclamation-circle text-red-500 text-3xl sm:text-4xl mb-4"></i>
            <p className={`${theme.colors.text} mb-4 text-sm sm:text-base`}>{error || "Film bulunamadı."}</p>
            <Button
              onClick={() => navigate("/")}
              className={`${theme.colors.primary} text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:scale-105 transition-transform duration-200`}
            >
              Ana Sayfaya Dön
            </Button>
          </Card>
        </main>
        <Footer theme={theme} />
      </div>
    );
  }

  const director = movie.credits?.crew.find((person) => person.job === "Director");
  const trailer = movie.videos?.results.find((video) => video.type === "Trailer");

  return (
    <div className={`flex flex-col min-h-screen ${theme.colors.bg}`}>
      <main className="flex-grow">
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <img
            src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : PLACEHOLDER_IMAGE}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
          <Button
            onClick={() => navigate("/")}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-all duration-300 shadow-lg"
          >
            <i className="fas fa-times text-lg"></i>
          </Button>
        </div>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 -mt-16 sm:-mt-24 md:-mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8">
            <div className="w-full md:w-1/3 lg:w-1/4 mx-auto md:mx-0">
              <img
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE}
                alt={movie.title}
                className="w-full max-w-[250px] sm:max-w-[300px] rounded-xl shadow-2xl mx-auto md:mx-0"
              />
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4 pt-4 sm:pt-6">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${theme.colors.text} mb-4 sm:mb-6 drop-shadow-md`}>
                {movie.title}
              </h1>
              <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center text-white/80 text-sm sm:text-base">
                  <i className="fas fa-calendar mr-2"></i>
                  {new Date(movie.release_date).toLocaleDateString("tr-TR")}
                </div>
                {movie.runtime && (
                  <div className="flex items-center text-white/80 text-sm sm:text-base">
                    <i className="fas fa-clock mr-2"></i>
                    {Math.floor(movie.runtime / 60)}s {movie.runtime % 60}d
                  </div>
                )}
                <div className="flex items-center text-white/80 text-sm sm:text-base">
                  <i className="fas fa-star text-yellow-400 mr-2"></i>
                  {movie.vote_average.toFixed(1)} ({movie.vote_count} oy)
                </div>
              </div>
              {movie.genres && (
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className={`${theme.colors.primary} px-2 sm:px-3 py-1 rounded-full text-white text-xs sm:text-sm font-medium hover:scale-105 transition-transform duration-200`}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
              <p className={`${theme.colors.text} mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed`}>{movie.overview}</p>
              {director && (
                <div className={`${theme.colors.text} mb-4 sm:mb-6 text-sm sm:text-base`}>
                  <strong>Yönetmen:</strong> {director.name}
                </div>
              )}
              {movie.credits?.cast && (
                <div className="mb-6 sm:mb-8">
                  <h2 className={`${theme.colors.text} text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4`}>Oyuncular</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                    {movie.credits.cast.slice(0, 6).map((actor) => (
                      <Card key={actor.id} className={`${theme.colors.cardBg}`}>
                        <img
                          src={actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : PLACEHOLDER_IMAGE}
                          alt={actor.name}
                          className="w-full aspect-[2/3] object-cover rounded-t-lg"
                        />
                        <div className="p-2 sm:p-3 text-center">
                          <div className={`${theme.colors.text} font-medium text-xs sm:text-sm`}>{actor.name}</div>
                          <div className={`${theme.colors.text} opacity-70 text-xs`}>{actor.character}</div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {trailer && (
                <div className="mb-6 sm:mb-8">
                  <h2 className={`${theme.colors.text} text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4`}>Fragman</h2>
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  className={`${theme.colors.primary} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                >
                  <i className="fab fa-github text-base sm:text-lg"></i>
                </Button>
                <Button
                  className={`${theme.colors.primary} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                >
                  <i className="fab fa-twitter text-base sm:text-lg"></i>
                </Button>
                <Button
                  className={`${theme.colors.primary} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200`}
                >
                  <i className="fab fa-instagram text-base sm:text-lg"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default MovieDetail;