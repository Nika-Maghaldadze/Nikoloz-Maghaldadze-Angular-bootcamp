import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, of } from 'rxjs';
import { startWith, takeUntil, tap, catchError } from 'rxjs/operators';

import { Movie } from '../../shared/models/movie.model';
import { MoviesService } from '../movie.service';
import { createTypeaheadStream } from '../../shared/utils/typeahead.util';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss'],
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl('', { nonNullable: true });
  public results: Movie[] = [];
  public selectedMovie: Movie | null = null;
  public isLoading = false;
  public errorMessage: string | null = null;
  private destroy$ = new Subject<void>();
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    const input$ = this.searchControl.valueChanges.pipe(startWith(this.searchControl.value));
    input$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      const trimmed = (value ?? '').trim();
      if (!trimmed) {
        this.results = [];
        this.isLoading = false;
        this.errorMessage = null;
        return;
      }
      this.isLoading = true;
      this.errorMessage = null;
    });

    const typeahead$ = createTypeaheadStream<Movie>(
      input$,
      term => this.moviesService.search(term),
      2
    );
    typeahead$
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.isLoading = false;
          this.errorMessage = null;
        }),
        catchError(err => {
          console.error(err);
          this.errorMessage = 'Something went wrong while searching.';
          this.isLoading = false;
          return of([]);
        })
      )
      .subscribe(results => (this.results = results));
  }
  onResultSelected(movie: Movie): void {
    this.selectedMovie = movie;
    this.searchControl.setValue(movie.title, { emitEvent: false });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
