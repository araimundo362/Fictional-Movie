import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MoviesService } from '../../services/Movies/movies.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {

  moviesForm: FormGroup;
  isSubmitted = false;
  invalidMovie = false;

  constructor(private formBuilder: FormBuilder,
              private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit() {
    this.moviesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ionViewWillEnter() {
    this.moviesForm.reset();
    this.isSubmitted = false;
    this.invalidMovie = false;
  }

  /** getters properties */
  get name() {
    return this.moviesForm.get('name');
  }

  get description() {
    return this.moviesForm.get('description');
  }

  get image() {
    return this.moviesForm.get('image');
  }

  addMovie = async () => {
    this.moviesForm.markAllAsTouched();
    this.isSubmitted = true;
    if(this.moviesForm.invalid) {
      return ;
    }
    const movieToPush = {
      name: this.name.value,
      description: this.description.value,
      image: this.image.value,
      rate: 0
    };
    const response = await this.moviesService.addMovie(movieToPush);
    if(response.ok) {
      this.isSubmitted = false;
      this.invalidMovie = false;
      this.router.navigateByUrl('/home');
    } else {
      this.isSubmitted = false;
      this.invalidMovie = true;
    }
  };
}

/* function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

<input type="file" onchange="previewFile()"><br>
<img src="" height="200" alt="Image preview...">
*/
