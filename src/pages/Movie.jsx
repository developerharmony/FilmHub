import React from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import MovieDetail from "../components/MovieDetail";

const Movie = () => {
  const { id } = useParams();
  const { theme } = useTheme();

  return <MovieDetail movieId={parseInt(id)} theme={theme} />;
};

export default Movie;