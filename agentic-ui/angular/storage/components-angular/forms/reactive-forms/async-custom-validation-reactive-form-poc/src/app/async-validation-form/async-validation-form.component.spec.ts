import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncValidationFormComponent } from './async-validation-form.component';

describe('AsyncValidationFormComponent', () => {
  let component: AsyncValidationFormComponent;
  let fixture: ComponentFixture<AsyncValidationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncValidationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsyncValidationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
