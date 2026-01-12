import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Choice, Question, QuestionType } from '../models/quiz.model';

type AnyObj = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class QuizService {
  private readonly http = inject(HttpClient);

  getQuestions() {
    return this.http.get<unknown>('/api/questions').pipe(
      map((raw) => (Array.isArray(raw) ? raw : [])),
      map((arr) => arr.map((x) => this.toQuestion(x)).filter((q): q is Question => q !== null)),
      catchError((err) => {
        console.error('Failed to load questions:', err);
        return of([] as Question[]);
      })
    );
  }

  private toQuestion(raw: unknown): Question | null {
    if (!raw || typeof raw !== 'object') return null;
    const o = raw as AnyObj;

    const id = this.asNonEmptyString(o['id']);
    const text = this.asNonEmptyString(o['text']);
    const type = this.asQuestionType(o['type']);
    const points = this.asNonNegativeNumber(o['points']);
    const choicesRaw = o['choices'];

    if (!id || !text || !type || points === null || !Array.isArray(choicesRaw)) {
      console.warn('invalid question shape, skipping:', raw);
      return null;
    }

    const choices = choicesRaw
      .map((c) => this.toChoice(c))
      .filter((c): c is Choice => c !== null);

    if (choices.length < 2) {
      console.warn('question must have >= 2 valid choices, skipping:', raw);
      return null;
    }

    const uniqueChoiceIds = new Set(choices.map((c) => c.id));
    if (uniqueChoiceIds.size !== choices.length) {
      console.warn('duplicate choice ids, skipping:', raw);
      return null;
    }

    return { id, text, type, points, choices };
  }

  private toChoice(raw: unknown): Choice | null {
    if (!raw || typeof raw !== 'object') return null;
    const o = raw as AnyObj;

    const id = this.asNonEmptyString(o['id']);
    const text = this.asNonEmptyString(o['text']);
    const isCorrect = typeof o['isCorrect'] === 'boolean' ? o['isCorrect'] : false;

    if (!id || !text) return null;
    return { id, text, isCorrect };
  }

  private asNonEmptyString(v: unknown): string | null {
    if (typeof v !== 'string') return null;
    const s = v.trim();
    return s.length ? s : null;
  }

  private asQuestionType(v: unknown): QuestionType | null {
    return v === 'single' || v === 'multiple' ? v : null;
  }

  private asNonNegativeNumber(v: unknown): number | null {
    const n = typeof v === 'number' ? v : Number(v);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }
}
