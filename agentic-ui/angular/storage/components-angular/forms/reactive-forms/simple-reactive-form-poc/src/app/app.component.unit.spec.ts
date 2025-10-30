import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', function () {
  let componentFixtureAppComponent: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
	let hTMLElement: HTMLElement;
  let submitHTMLButtonElement: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [AppComponent],
      }).compileComponents();
    });

    beforeEach(() => {
      componentFixtureAppComponent = TestBed.createComponent(AppComponent);
      appComponent = componentFixtureAppComponent.componentInstance;
		  hTMLElement = componentFixtureAppComponent.nativeElement;
		  submitHTMLButtonElement = hTMLElement.querySelector("button") as HTMLButtonElement;
    });

  it('should create the app', function() {expect(appComponent).toBeTruthy();});

  it('should have a fullname', function() {
    let fullnameHTMLInputElement = hTMLElement.querySelector('input[formControlName="fullname"]') as HTMLInputElement;
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(fullnameHTMLInputElement.classList.toString()).toContain('is-invalid');
    fullnameHTMLInputElement.value = 'dcfgvh';
		fullnameHTMLInputElement.dispatchEvent(new Event("input"));
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(fullnameHTMLInputElement.classList.toString()).not.toContain('is-invalid');
  });

  it('should have a name', () => {
    let nameHTMLInputElement = hTMLElement.querySelector('input[formControlName="username"]') as HTMLInputElement;
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(nameHTMLInputElement.classList.toString()).toContain('is-invalid');
    nameHTMLInputElement.value = 'dcfgvh';
		nameHTMLInputElement.dispatchEvent(new Event("input"));
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(nameHTMLInputElement.classList.toString()).not.toContain('is-invalid');
  });

  it('should have a valid email', () => {
		let emailHTMLInputElement = hTMLElement.querySelector('input[formControlName="email"]') as HTMLInputElement;
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(emailHTMLInputElement.classList.toString()).toContain('is-invalid');
		emailHTMLInputElement.value = "invalid-email";
		emailHTMLInputElement.dispatchEvent(new Event("input"));
    componentFixtureAppComponent.detectChanges();
    expect(emailHTMLInputElement.classList.toString()).toContain('is-invalid');
		emailHTMLInputElement.value = "validemail@gmail.com";
		emailHTMLInputElement.dispatchEvent(new Event("input"));
    componentFixtureAppComponent.detectChanges();
    expect(emailHTMLInputElement.classList.toString()).not.toContain('is-invalid');
  });

  it('should have a password', () => {
    let passwordHTMLInputElement = hTMLElement.querySelector('input[formControlName="password"]') as HTMLInputElement;
    submitHTMLButtonElement.click();
    componentFixtureAppComponent.detectChanges();
    expect(passwordHTMLInputElement.classList.toString()).toContain('is-invalid');
    passwordHTMLInputElement.value = 'dcfgvh';
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
    componentFixtureAppComponent.detectChanges();
    expect(passwordHTMLInputElement.classList.toString()).not.toContain('is-invalid');
  });

  it('should have confirm password equal to password', () => {
		let passwordHTMLInputElement = hTMLElement.querySelector('input[formControlName="password"]') as HTMLInputElement;
		let confirmPasswordHTMLInputElement = hTMLElement.querySelector('input[formControlName="confirmPassword"]') as HTMLInputElement;
		passwordHTMLInputElement.value = "1234";
		confirmPasswordHTMLInputElement.value = "5678";
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
		confirmPasswordHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
    expect(confirmPasswordHTMLInputElement.classList.toString()).toContain('is-invalid');
		passwordHTMLInputElement.value = "1234";
		confirmPasswordHTMLInputElement.value = "1234";
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
		confirmPasswordHTMLInputElement.dispatchEvent(new Event("input"));
		componentFixtureAppComponent.detectChanges();
    expect(confirmPasswordHTMLInputElement.classList.toString()).not.toContain('is-invalid');
  });
});