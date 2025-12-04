import { Injectable } from '@angular/core';
import { Movie } from '../shared/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly movies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      genre: 'Sci-Fi',
      year: 2010,
      director: 'Christopher Nolan',
      url:"../../../assets/movie-banners/inception.png"
    },
    {
      id: 2,
      title: 'Interstellar',
      genre: 'Sci-Fi',
      year: 2014,
      director: 'Christopher Nolan',
      url:"../../../assets/movie-banners/interstellar.png"
    },
    {
      id: 3,
      title: 'The Dark Knight',
      genre: 'Action',
      year: 2008,
      director: 'Christopher Nolan',
      url:"../../../assets/movie-banners/dark-knight.png"
    },
    {
      id: 4,
      title: 'Fight Club',
      genre: 'Drama',
      year: 1999,
      director: 'David Fincher',
      url:"../../../assets/movie-banners/fight-club.png"
    },
    {
      id: 5,
      title: 'The Matrix',
      genre: 'Sci-Fi',
      year: 1999,
      director: 'The Wachowskis',
      url:"../../../assets/movie-banners/matrix.png"
    },
    {
      id: 6,
      title: 'Pulp Fiction',
      genre: 'Crime',
      year: 1994,
      director: 'Quentin Tarantino',
      url:"../../../assets/movie-banners/PulpFiction.png"
    },
    {
      id: 7,
      title: 'The Shawshank Redemption',
      genre: 'Drama',
      year: 1994,
      director: 'Frank Darabont',
      url:"../../../assets/movie-banners/shawshank.png"
    },
    {
      id: 8,
      title: 'The Godfather',
      genre: 'Crime',
      year: 1972,
      director: 'Francis Ford Coppola',
      url:"../../../assets/movie-banners/godfather.png"
    },
    {
      id: 9,
      title: 'Forrest Gump',
      genre: 'Drama',
      year: 1994,
      director: 'Robert Zemeckis',
      url:"../../../assets/movie-banners/forrestGump.png"
    },
    {
      id: 10,
      title: 'The Social Network',
      genre: 'Drama',
      year: 2010,
      director: 'David Fincher',
      url:"../../../assets/movie-banners/socialNetwork.png"
    },
  ];

  getAll(): Movie[] {
    return this.movies;
  }
  search(term: string): Movie[] {
    const query = term.toLowerCase();

    return this.movies.filter((movie) => {
      return (
        movie.title.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query)
      );
    });
  }
}
