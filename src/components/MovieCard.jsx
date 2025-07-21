import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./ui/Card";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE } from "../utils/constants";

const MovieCard = ({ movie, theme }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card
      role="button"
      aria-label={`Detaylar için ${movie.title} filmine git`}
      className={`${theme.colors.cardBg} w-full max-w-[250px] mx-auto hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group box-border`}
      onClick={handleCardClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        <img
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE}
          alt={movie.title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
          <i className="fas fa-star text-yellow-400 mr-1"></i>
          {movie.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-3">
        <h3
          className={`font-semibold ${theme.colors.text} line-clamp-2 mb-2 group-hover:${theme.colors.accent} transition-colors duration-300 text-sm`}
        >
          {movie.title}
        </h3>
        <p className="text-gray-500 text-xs mb-2">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : "Tarih bilinmiyor"}
        </p>
        <p className={`text-xs ${theme.colors.text} opacity-70 line-clamp-3`}>
          {movie.overview || "Özet bulunmuyor."}
        </p>
      </div>
    </Card>
  );
};

export default MovieCard;