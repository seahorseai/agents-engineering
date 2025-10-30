import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import { NgstyleAttributeComponent } from './ngstyle-attribute.component';


describe('NgstyleAttributeComponent', () => {

  let component: NgstyleAttributeComponent;
  let fixture: ComponentFixture<NgstyleAttributeComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({declarations: [NgstyleAttributeComponent]}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(NgstyleAttributeComponent);
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