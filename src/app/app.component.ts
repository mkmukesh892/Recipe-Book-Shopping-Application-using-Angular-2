import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
