import { Movie } from '../interface/movie';

export const checkMovie = (db: Movie[], movie: Movie) => db.find((film) => film.name === movie.name) !== undefined ? true : false;
