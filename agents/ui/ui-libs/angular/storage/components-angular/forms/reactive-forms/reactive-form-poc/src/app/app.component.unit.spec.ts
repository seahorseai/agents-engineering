import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
	let componentFixtureAppComponent: ComponentFixture<AppComponent>;
	let appComponent: AppComponent;
	let appComponentHtmlElement: HTMLElement;
	let submitHTMLButtonElement: HTMLButtonElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [ReactiveFormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		componentFixtureAppComponent = TestBed.createComponent(AppComponent);
		appComponent = componentFixtureAppComponent.componentInstance;
		appComponentHtmlElement = componentFixtureAppComponent.nativeElement;
		submitHTMLButtonElement = appComponentHtmlElement.querySelector("button") as HTMLButtonElement;
		componentFixtureAppComponent.detectChanges();
	});

	it('should create the app', () => { expect(appComponent).toBeTruthy(); });

	it('should have a fullname', () => {
		let fullnameHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="fullname"]') as HTMLInputElement;
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
		let nameHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="username"]') as HTMLInputElement;
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
		let emailHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="email"]') as HTMLInputElement;
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(emailHTMLInputElement.classList.toString()).toContain('is-invalid');
		emailHTMLInputElement.value = "invalid-email";
		emailHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(emailHTMLInputElement.classList.toString()).toContain('is-invalid');
		emailHTMLInputElement.value = "validemail@gmail.com";
		emailHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(emailHTMLInputElement.classList.toString()).not.toContain('is-invalid');
	});

	it('should have a password', () => {
		let passwordHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="password"]') as HTMLInputElement;
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(passwordHTMLInputElement.classList.toString()).toContain('is-invalid');
		passwordHTMLInputElement.value = 'dcfgvh';
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(passwordHTMLInputElement.classList.toString()).not.toContain('is-invalid');
	});

	it('should have confirm password equal to password', () => {
		let passwordHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="password"]') as HTMLInputElement;
		let confirmPasswordHTMLInputElement = appComponentHtmlElement.querySelector('input[formControlName="confirmPassword"]') as HTMLInputElement;
		passwordHTMLInputElement.value = "1234";
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
		confirmPasswordHTMLInputElement.value = "5678";
		confirmPasswordHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(confirmPasswordHTMLInputElement.classList.toString()).toContain('is-invalid');
		passwordHTMLInputElement.value = "1234";
		passwordHTMLInputElement.dispatchEvent(new Event("input"));
		confirmPasswordHTMLInputElement.value = "1234";
		confirmPasswordHTMLInputElement.dispatchEvent(new Event("input"));
		submitHTMLButtonElement.click();
		componentFixtureAppComponent.detectChanges();
		expect(confirmPasswordHTMLInputElement.classList.toString()).not.toContain('is-invalid');
	});
});