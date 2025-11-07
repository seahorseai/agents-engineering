import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgclassAttributeComponent } from './ngclass-attribute/ngclass-attribute.component';
import { NgstyleAttributeComponent } from './ngstyle-attribute/ngstyle-attribute.component';
import { NgmodelAttributeComponent } from './ngmodel-attribute/ngmodel-attribute.component';
import { IfDirectiveComponent } from './if-directive/if-directive.component';
import { ForDirectiveComponent } from './for-directive/for-directive.component';
import { SwitchDirectiveComponent } from './switch-directive/switch-directive.component';

const routes: Routes = [
	{path: 'switch-directive', component: SwitchDirectiveComponent},
	{ path: 'for-directive', component: ForDirectiveComponent },
	{ path: 'if-directive', component: IfDirectiveComponent },
  { path: 'ngclass-directive', component: NgclassAttributeComponent },
	{ path: 'ngstyle-directive', component: NgstyleAttributeComponent },
	{ path: 'ngmodel-directive', component: NgmodelAttributeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }