import { enableProdMode } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(withFetch()), provideRouter(appRoutes)]
})
  .catch(err => console.log(err));
