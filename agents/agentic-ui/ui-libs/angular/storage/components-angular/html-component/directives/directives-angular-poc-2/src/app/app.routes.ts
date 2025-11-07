import { Routes } from '@angular/router';
import { ForDirectiveComponent } from './for-directive/for-directive.component'; 
import { IfDirectiveComponent } from './if-directive/if-directive.component';
import { SwitchDirectiveComponent } from './switch-directive/switch-directive.component';

import { NgmodelDirectiveComponent } from './ngmodel-directive/ngmodel-directive.component';
import { NgclassDirectiveComponent } from './ngclass-directive/ngclass-directive.component';
import { NgstyleDirectiveComponent } from './ngstyle-directive/ngstyle-directive.component';

export const routes: Routes = [
    { path: 'for-directive', component: ForDirectiveComponent },
    { path: 'if-directive', component: IfDirectiveComponent },
    { path: 'switch-directive', component: SwitchDirectiveComponent },
    { path: 'ngmodel-directive', component: NgmodelDirectiveComponent },
    { path: 'ngclass-directive', component: NgclassDirectiveComponent },
    { path: 'ngstyle-directive', component: NgstyleDirectiveComponent },
  ];