import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interface/movie';
import { MoviesService } from '../../services/Movies/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  loading = false;
  movies: Movie[];

  constructor(private moviesService: MoviesService,
              private router: Router) {}


  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.movies = this.moviesService.getMovies();
      this.loading = false;
    }, 2000);
  }

  setNewRate = (ev: any, mov: string) => {
    this.moviesService.rateMovie(mov,ev);
  };

  goToEditMovie = (index: number) => {
    this.router.navigate(['/edit-movie', {film: this.movies[index].name }]);
  };
}
