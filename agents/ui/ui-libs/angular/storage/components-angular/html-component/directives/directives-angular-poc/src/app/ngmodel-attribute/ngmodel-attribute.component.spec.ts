import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { NgmodelAttributeComponent } from './ngmodel-attribute.component';
import { FormsModule } from '@angular/forms';


describe('NgmodelAttributeComponent', () => {

  let component: NgmodelAttributeComponent;
  let fixture: ComponentFixture<NgmodelAttributeComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
			declarations: [NgmodelAttributeComponent],
			imports: [FormsModule]
		}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(NgmodelAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeDefined();
  });


  it('should update username when input value changes', () => {
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('input');
    const newUsername = 'NewUsername';
    inputElement.value = newUsername;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.username).toEqual(newUsername);
  });

  it('should display updated username in paragraph', () => {
    const paragraphElements: NodeList = fixture.nativeElement.querySelectorAll('p');
    const newUsername = 'NewUsername';
    component.username = newUsername;
    fixture.detectChanges();
    expect(paragraphElements[1].textContent).toContain(newUsername);
  });
});