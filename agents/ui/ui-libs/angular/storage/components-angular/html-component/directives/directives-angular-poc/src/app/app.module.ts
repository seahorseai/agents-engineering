import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { NgclassAttributeComponent } from './ngclass-attribute/ngclass-attribute.component';
import { NgstyleAttributeComponent } from './ngstyle-attribute/ngstyle-attribute.component';
import { NgmodelAttributeComponent } from './ngmodel-attribute/ngmodel-attribute.component';
import { FormsModule } from '@angular/forms';
import { SwitchDirectiveComponent } from './switch-directive/switch-directive.component';

@NgModule({
	declarations: [
		AppComponent,
		NgclassAttributeComponent,
		NgstyleAttributeComponent,
		NgmodelAttributeComponent,
  	SwitchDirectiveComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		RouterOutlet
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }