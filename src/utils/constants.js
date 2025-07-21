export const BASE_URL = "https://api.themoviedb.org/3";
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const PLACEHOLDER_IMAGE = "https://via.placeholder.com/500x750?text=Film+Resmi+Yok";

export const categories = [
  { id: "popular", name: "Popüler Filmler", icon: "fas fa-fire" },
  { id: "top_rated", name: "En İyi Puanlı", icon: "fas fa-star" },
  { id: "upcoming", name: "Yakında Gelenler", icon: "fas fa-calendar-alt" },
  { id: "now_playing", name: "Şimdi Gösterimde", icon: "fas fa-ticket-alt" },
];