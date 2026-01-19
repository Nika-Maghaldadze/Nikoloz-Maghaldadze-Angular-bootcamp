import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';

@Component({
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
class TestShell {}

describe('Not Found feature (integration)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestShell],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('navigating to unknown route renders 404/not found content', async () => {
    const router = TestBed.inject(Router);
    const fixture = TestBed.createComponent(TestShell);
    fixture.detectChanges();

    await router.navigateByUrl('/___definitely_unknown___');
    fixture.detectChanges();

    const text = (fixture.nativeElement.textContent as string).toLowerCase();
    expect(text).toMatch(/not found|404/);
  });
});
