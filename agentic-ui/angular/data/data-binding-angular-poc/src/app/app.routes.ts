import { Routes } from '@angular/router';

import { TextInterpolationComponent } from './text-interpolation/text-interpolation.component';
import { PropertyBindingComponent } from './property-binding/property-binding.component';
import { AttributeBindingComponent } from './attribute-binding/attribute-binding.component';
import { TwoWayBindingComponent } from './two-way-binding/two-way-binding.component';
import { EventBindingComponent } from './event-binding/event-binding.component';

export const routes: Routes = [
  { path: 'text-interpolation', component: TextInterpolationComponent },
  { path: 'property-binding', component: PropertyBindingComponent },
  { path: 'attribute-binding', component: AttributeBindingComponent },
  { path: 'two-way-binding', component: TwoWayBindingComponent },
  { path: 'event-binding', component: EventBindingComponent },
];
