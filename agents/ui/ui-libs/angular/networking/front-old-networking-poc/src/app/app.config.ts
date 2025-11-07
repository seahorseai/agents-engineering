import { provideHttpClient, withFetch} from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';

export const applicationConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()) ],
};
