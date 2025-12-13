import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import firebase from 'firebase/compat/app';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'app';
  /*loadedFeature = 'recipe';
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }*/
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyA-M0c5Ad-hsQ96IWRiLFNVgCabBFhG_RI",
      authDomain: "recipebook-b6a08.firebaseapp.com"
    });
  }
}
