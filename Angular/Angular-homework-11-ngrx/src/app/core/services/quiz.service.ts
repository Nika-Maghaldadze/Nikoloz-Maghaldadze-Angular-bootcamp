import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/quiz.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);

  /** Loads the quiz questions from the json-server API (`db.json`). */
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions`);
  }
}
