import { enableProdMode } from '@angular/core';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { initializeApp } from 'firebase/app';
import { appRoutes } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
if (environment.production) {
  enableProdMode();
}
initializeApp({
      apiKey: "AIzaSyA-M0c5Ad-hsQ96IWRiLFNVgCabBFhG_RI",
      authDomain: "recipebook-b6a08.firebaseapp.com",
      databaseURL: "https://recipebook-b6a08.firebaseio.com",
      projectId: "recipebook-b6a08",
      storageBucket: "recipebook-b6a08.firebasestorage.app",
      messagingSenderId: "953648431344",
      appId: "1:953648431344:web:b55b516bc0d8609166c235"
    });
bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(withFetch()), provideRouter(appRoutes)]
})
  .catch(err => console.log(err));
