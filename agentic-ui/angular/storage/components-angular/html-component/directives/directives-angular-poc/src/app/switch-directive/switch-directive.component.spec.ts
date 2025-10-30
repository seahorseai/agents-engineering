import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { SwitchDirectiveComponent } from './switch-directive.component';
import { FormsModule } from '@angular/forms';


describe('SwitchDirectiveComponent', () => {

  let component: SwitchDirectiveComponent;
  let fixture: ComponentFixture<SwitchDirectiveComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
			declarations: [SwitchDirectiveComponent],
			imports: [FormsModule]
		}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display "Welcome, Admin User!" when userRole is "admin"', () => {
    component.userRole = 'admin';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome, Admin User!');
  });

  it('should display "Welcome, Registered User!" when userRole is "registered"', () => {
    component.userRole = 'registered';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome, Registered User!');
  });

  it('should display "Login" when userRole is empty', () => {
    component.userRole = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Login');
  });

});
