import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppModule } from './app.module';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let harness: RouterTestingHarness;

	const appComponentRoutes: Routes = [
		{ path: 'settings', component: SettingsComponent },
		{ path: 'profile', component: ProfileComponent },
		{ path: 'home', component: HomeComponent },
		{ path: '', redirectTo: 'home', pathMatch: 'full' },
		{ path: '**', component: PageNotFoundComponent },
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [
				RouterModule.forRoot(appComponentRoutes),
			],
			providers: [RouterModule]
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		harness = await RouterTestingHarness.create();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('navigating to each path should generate the corresponding components', async () => {
		await harness.navigateByUrl('/settings', SettingsComponent);
		expect(document.querySelector('app-settings')).not.toEqual(null);
		await harness.navigateByUrl('/profile', ProfileComponent);
		expect(document.querySelector('app-profile')).not.toEqual(null);
		await harness.navigateByUrl('/home', HomeComponent);
		expect(document.querySelector('app-home')).not.toEqual(null);
		await harness.navigateByUrl('/pepe', PageNotFoundComponent);
		expect(document.querySelector('app-page-not-found')).not.toEqual(null);
		await harness.navigateByUrl('/', HomeComponent);
		expect(document.querySelector('app-home')).not.toEqual(null);
	})
});