import React from "react";
import { Movie } from "../../types/movie";
import css from "./MovieCard.module.css";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={css.card}>
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
    </div>
  );
};

export default MovieCard;
