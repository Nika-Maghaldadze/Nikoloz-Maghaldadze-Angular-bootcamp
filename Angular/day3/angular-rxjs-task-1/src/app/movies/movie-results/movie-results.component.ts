import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../shared/models/movie.model';

// ✅ Add util import
import { highlightTerm } from '../../shared/utils/highlight.util';

@Component({
  selector: 'app-movie-results',
  templateUrl: './movie-results.component.html',
  styleUrls: ['./movie-results.component.scss'],
})
export class MovieResultsComponent {
  @Input() movies: Movie[] = [];
  @Input() query: string = '';

  @Output() movieSelected = new EventEmitter<Movie>();

  highlightTerm(text: string, query: string): string {
    return highlightTerm(text, query);
  }

  onMovieClick(movie: Movie) {
    this.movieSelected.emit(movie);
  }
}
