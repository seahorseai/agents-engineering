import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { NgstyleDirectiveComponent } from './ngstyle-directive.component';


describe('NgstyleAttributeComponent', () => {

  let component: NgstyleDirectiveComponent;
  let fixture: ComponentFixture<NgstyleDirectiveComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [NgstyleDirectiveComponent]}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(NgstyleDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeDefined();
  });
  
  it('should increase font size', () => {
    const initialFontSize = component.personalizedStyle['font-size.px'];
    component.incFontSize();
    fixture.detectChanges();
    expect(component.personalizedStyle['font-size.px']).toBe(initialFontSize + 1);
  });

  it('should decrease font size', () => {
    const initialFontSize = component.personalizedStyle['font-size.px'];
    component.desFontSize();
    fixture.detectChanges();
    expect(component.personalizedStyle['font-size.px']).toBe(initialFontSize - 1);
  });
});