import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { MovieResultsComponent } from './movies/movie-results/movie-results.component';

@NgModule({
  declarations: [AppComponent, MovieSearchComponent, MovieResultsComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
