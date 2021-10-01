/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/interface/movie';
import { Response } from 'src/app/interface/response';
import { checkMovie } from 'src/app/utils/checkMovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesDataBase: Movie[]= [
    {name: 'Avengers: Infinity War',
     description: 'Los superhéroes se alían para vencer al poderoso Thanos, el peor enemigo al que se han enfrentado.Si Thanos logra reunir las seis gemas del infinito: poder, tiempo, alma, realidad, mente y espacio, nadie podrá detenerlo.',
     image: '../../assets/image/avengers_infinity_war.jpg', rate: 5},
    {name: 'Venom', description: 'El periodista Eddie Brock intenta desenmascarar al genio científico Carlton Drake, el célebre fundador de la Fundación Vida.', image: '../../assets/image/venom.jpg', rate: 4},
    {name: 'Fast & Furious 9', description: 'Dom Toretto vive una vida tranquila junto a Letty y su hijo, pero el peligro siempre regresa a su vida. En esta ocasión, el equipo se enfrenta a un complot mundial orquestado por el asesino más temible del mundo: el hermano de Dom.',
    image: '../../assets/image/Fast_Furious_9.jpg', rate: 3},
    {name: 'Joker', description: 'Arthur Fleck adora hacer reír a la gente, pero su carrera como comediante es un fracaso. El repudio social, la marginación y una serie de trágicos acontecimientos lo conducen por el sendero de la locura y, finalmente, cae en el mundo del crimen.', image: '../../assets/image/joker.jpg', rate: 5}
  ];

  constructor() { }

  getMovies = () => this.moviesDataBase;

  getAMovie = (data: number | string ) => typeof data === 'number' ? this.moviesDataBase[data] : this.moviesDataBase.find( (fm) => fm.name === data);

  addMovie = async (movie: Movie) => new Promise<Response>((resolve) => {
    let response: Response;
    setTimeout(() => {
      if (!checkMovie(this.moviesDataBase, movie)) {
        this.moviesDataBase.push(movie);
        response = {
          ok: true
        };
        resolve(response);
      } else {
        response = {
          ok: false,
          motive: 'MOVIE_EXIST'
        };
        resolve(response);
      }
    }, 2000);
  });

  rateMovie = (movieName: string, rate: number) => {
    this.moviesDataBase.find((flm) => flm.name === movieName).rate = rate;
  };

  edit = (movie: Movie) => {
    const film = this.moviesDataBase.find((mov) => mov.name === movie.name);
    film.description = movie.description;
    film.image = movie.image;
    film.rate = movie.rate;
  };
}
