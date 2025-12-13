import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
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
      apiKey: "AIzaSyB4ZBsSWGFZGpkmT9MOUT8kVRZdSTEc7Hg",
    authDomain: "recipebook-b6a08.firebaseapp.com"
    });
  }
}
