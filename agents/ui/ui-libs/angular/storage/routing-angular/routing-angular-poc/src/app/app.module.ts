import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		ProfileComponent,
		PageNotFoundComponent,
		SettingsComponent,
		HomeComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }