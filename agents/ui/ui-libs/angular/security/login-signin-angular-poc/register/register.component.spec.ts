import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [provideRouter(routes)]
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});