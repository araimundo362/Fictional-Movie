import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../interface/movie';
import { MoviesService } from '../services/Movies/movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.page.html',
  styleUrls: ['./edit-movie.page.scss'],
})
export class EditMoviePage implements OnInit {

  movieName: string;
  movie: Movie;
  loading = false;
  editMode = false;
  isPristine = false;
  editing = false;

  editionForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private movieService: MoviesService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.movieName = this.route.snapshot.params.film;
    this.loading = true;
    setTimeout( ()=> {
      this.movie = this.movieService.getAMovie(this.movieName);
      this.editionForm = this.formBuilder.group({
        description: [this.movie.description, Validators.required],
        name: [this.movie.name, Validators.required],
        image: [this.movie.image, Validators.required],
        rate: [this.movie.rate]
      });
      this.loading = false;
    }, 2000);
  }

  setEditMode = (mode: boolean) => this.editMode = mode;

  setNewRate = (ev: any, mov: string) => {
    this.movieService.rateMovie(mov,ev);
  };

  edit = () => {
    if(this.editionForm.pristine) {
      this.isPristine = true;
    } else {
      if(this.editionForm.valid) {
        this.editing = true;
        setTimeout(()=> {
          this.movieService.edit(this.editionForm.value);
          this.editMode = false;
          this.router.navigateByUrl('/home');
        },1000);
      }
    }
  };
}
