import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/quiz.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private http = inject(HttpClient);

  getQuestions() {
    return this.http.get<Question[]>(`${environment.apiUrl}/questions`);
  }
}
