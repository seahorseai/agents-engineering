import { TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComponent],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(PageNotFoundComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});