/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Movie } from 'src/app/interface/movie';

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

  rateMovie = (movieName: string, rate: number) => {
    this.moviesDataBase.find((flm) => flm.name === movieName).rate = rate;
  };
}
