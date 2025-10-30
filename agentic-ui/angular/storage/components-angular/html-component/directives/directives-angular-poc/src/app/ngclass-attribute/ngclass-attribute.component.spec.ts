import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { NgclassAttributeComponent } from './ngclass-attribute.component';

describe('NgclassAttributeComponent', () => {

  let ngClassAttributeComponent: NgclassAttributeComponent;
  let componentFixture: ComponentFixture<NgclassAttributeComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [NgclassAttributeComponent]}).compileComponents();
  }));
  beforeEach(() => {
    componentFixture = TestBed.createComponent(NgclassAttributeComponent);
    ngClassAttributeComponent = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });
	
  it('should create', () => {
    expect(ngClassAttributeComponent).toBeDefined();
  });

  it('should toggle isClicked when the button is clicked', () => {
    const button = componentFixture.nativeElement.querySelector('button');
    expect(ngClassAttributeComponent.isClicked).toBe(false);
    button.click();
    componentFixture.detectChanges();
    expect(ngClassAttributeComponent.isClicked).toBe(true);
    button.click();
    componentFixture.detectChanges();
    expect(ngClassAttributeComponent.isClicked).toBe(false);
  });

  it('should apply text with a green background when isClicked is true', () => {
    const h3Element = componentFixture.nativeElement.querySelector('h3');
    expect(h3Element.classList.contains('text-darkgreen')).toBe(false);
    ngClassAttributeComponent.isClicked = true;
    componentFixture.detectChanges();
    expect(h3Element.classList.contains('text-darkgreen')).toBe(true);
  });
});