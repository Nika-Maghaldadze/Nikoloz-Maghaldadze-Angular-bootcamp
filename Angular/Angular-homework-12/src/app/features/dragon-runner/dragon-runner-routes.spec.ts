import { DRAGON_RUNNER_ROUTES } from './dragon-runner-routes';

describe('dragon runner routes', () => {
  it('has at least one route', () => {
    expect(Array.isArray(DRAGON_RUNNER_ROUTES)).toBe(true);
    expect(DRAGON_RUNNER_ROUTES.length).toBeGreaterThan(0);
  });
});
