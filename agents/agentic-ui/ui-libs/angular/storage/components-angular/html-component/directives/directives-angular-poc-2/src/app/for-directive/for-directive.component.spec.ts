import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ForDirectiveComponent } from './for-directive.component';


describe('ForDirectiveComponent', () => {

  let component: ForDirectiveComponent;
  let fixture: ComponentFixture<ForDirectiveComponent>;
  
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({imports: [ForDirectiveComponent]}).compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ForDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display countries list', () => {
    const countriesList = fixture.nativeElement.querySelector('ul');
    expect(countriesList).toBeTruthy();

    const countriesItems = countriesList.querySelectorAll('li');
    expect(countriesItems.length).toBe(component.countries.length);

    component.countries.forEach((country, index) => {
      expect(countriesItems[index].textContent).toContain(country);
    });
  });

  it('should display "No countries found" when the list is empty', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const countriesList = fixture.nativeElement.querySelector('ul');
    expect(countriesList).toBeTruthy();

    const emptyMessage = countriesList.querySelector('li');
    expect(emptyMessage.textContent).toContain('No countries found');
  });

  it('should delete countries when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const countriesList = fixture.nativeElement.querySelector('ul');
    expect(countriesList).toBeTruthy();

    const countriesItems = countriesList.querySelectorAll('li');
    expect(countriesItems.length).toBe(1); 
  });
});