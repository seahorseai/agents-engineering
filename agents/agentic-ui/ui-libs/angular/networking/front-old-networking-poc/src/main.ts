import { bootstrapApplication } from '@angular/platform-browser';
import { applicationConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
})
  .catch((err) => console.error(err));
