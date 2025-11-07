import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { IfDirectiveComponent } from './if-directive.component';

describe('IfDirectiveComponent', () => {

  let component: IfDirectiveComponent;
  let fixture: ComponentFixture<IfDirectiveComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [IfDirectiveComponent]}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(IfDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display username when username is provided', () => {
    component.username = 'TestUser';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome, TestUser');
  });

  it('should display login link when username is not provided', () => {
    component.username = '';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('a[href="/login"] h1').textContent).toContain('Login');
  });

  it('should delete username when delete button is clicked', () => {
    const deleteButton = fixture.nativeElement.querySelector('button');
    deleteButton.click();
    fixture.detectChanges();
    expect(component.username).toBe('');
  });

});
