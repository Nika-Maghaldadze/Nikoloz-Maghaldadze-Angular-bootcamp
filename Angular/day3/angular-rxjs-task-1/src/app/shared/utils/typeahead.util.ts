import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
export function createTypeaheadStream<T>(
  input$: Observable<string>,
  searchFn: (term: string) => T[],
  minLength = 2
): Observable<T[]> {
  return input$.pipe(
    map((value) => value ?? ''),
    map((value) => value.trim()),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((term) => {
      if (!term || term.length < minLength) {
        return of([]);
      }
      const results = searchFn(term);
      return of(results);
    })
  );
}
