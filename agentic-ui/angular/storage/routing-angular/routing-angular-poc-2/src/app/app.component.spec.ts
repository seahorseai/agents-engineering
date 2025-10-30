import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HomeComponent } from './home/home.component';
import { routes } from './app.routes';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
	let harness: RouterTestingHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
			providers: [provideRouter(routes)]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
		harness = await RouterTestingHarness.create();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

	it('navigating to each path should generate the corresponding components', async() => {
		harness.navigateByUrl('/settings', SettingsComponent);
		await fixture.whenStable();
		expect(document.querySelector('app-settings')).not.toEqual(null);
		harness.navigateByUrl('/profile', ProfileComponent);
		await fixture.whenStable();
		expect(document.querySelector('app-profile')).not.toEqual(null);
		harness.navigateByUrl('/home', HomeComponent);
		await fixture.whenStable();
		expect(document.querySelector('app-home')).not.toEqual(null);
		harness.navigateByUrl('/pepe', PageNotFoundComponent);
		await fixture.whenStable();
		expect(document.querySelector('app-page-not-found')).not.toEqual(null);
		harness.navigateByUrl('/', HomeComponent);
		await fixture.whenStable();
		expect(document.querySelector('app-home')).not.toEqual(null);
	})
});