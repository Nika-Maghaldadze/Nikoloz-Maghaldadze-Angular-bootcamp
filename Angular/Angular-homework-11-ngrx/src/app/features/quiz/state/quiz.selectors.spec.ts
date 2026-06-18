import { describe, expect, it } from 'vitest';

import { Question } from '../../../core/models/quiz.model';
import { selectTotalScore, selectView } from './quiz.selectors';

const single = (id: string, correctId: string, points = 1): Question => ({
  id,
  text: `Q ${id}`,
  type: 'single',
  points,
  choices: [
    { id: 'a', text: 'A', isCorrect: correctId === 'a' },
    { id: 'b', text: 'B', isCorrect: correctId === 'b' },
    { id: 'c', text: 'C', isCorrect: correctId === 'c' },
  ],
});

const multi = (id: string, correctIds: string[], points = 2): Question => ({
  id,
  text: `Q ${id}`,
  type: 'multiple',
  points,
  choices: [
    { id: 'a', text: 'A', isCorrect: correctIds.includes('a') },
    { id: 'b', text: 'B', isCorrect: correctIds.includes('b') },
    { id: 'c', text: 'C', isCorrect: correctIds.includes('c') },
  ],
});

describe('selectTotalScore', () => {
  it('awards points for a correct single answer', () => {
    const q = single('q1', 'b', 5);
    expect(selectTotalScore.projector([q], { q1: 'b' })).toBe(5);
  });

  it('gives no points for a wrong single answer', () => {
    const q = single('q1', 'b');
    expect(selectTotalScore.projector([q], { q1: 'a' })).toBe(0);
  });

  it('gives no points for an unanswered question', () => {
    const q = single('q1', 'b');
    expect(selectTotalScore.projector([q], {})).toBe(0);
  });

  it('awards points only on an exact multiple-choice match', () => {
    const q = multi('q1', ['a', 'c'], 3);
    expect(selectTotalScore.projector([q], { q1: ['a', 'c'] })).toBe(3);
  });

  it('gives no points when a correct choice is missing', () => {
    const q = multi('q1', ['a', 'c'], 3);
    expect(selectTotalScore.projector([q], { q1: ['a'] })).toBe(0);
  });

  it('gives no points when an extra wrong choice is selected (regression)', () => {
    const q = multi('q1', ['a', 'c'], 3);
    // Selecting everything must NOT score full marks.
    expect(selectTotalScore.projector([q], { q1: ['a', 'b', 'c'] })).toBe(0);
  });

  it('sums across multiple questions', () => {
    const q1 = single('q1', 'a', 2);
    const q2 = multi('q2', ['b', 'c'], 4);
    const score = selectTotalScore.projector([q1, q2], { q1: 'a', q2: ['b', 'c'] });
    expect(score).toBe(6);
  });
});

describe('selectView', () => {
  const questions = [single('q1', 'a'), single('q2', 'a')];

  it('shows the intro at step 0', () => {
    expect(selectView.projector(0, questions)).toBe('INTRO');
  });

  it('shows a question for steps within range', () => {
    expect(selectView.projector(1, questions)).toBe('QUESTION');
    expect(selectView.projector(2, questions)).toBe('QUESTION');
  });

  it('shows results once past the last question', () => {
    expect(selectView.projector(3, questions)).toBe('RESULTS');
  });
});
