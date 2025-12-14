import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private auth: Auth = getAuth();
  
  token: string | null = null;

  signupUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.auth.currentUser?.getIdToken().then(
          (token: string) => { this.token = token; }
        );
      })
      .catch(error => console.log(error));
  }

  getToken() {
    this.auth.currentUser?.getIdToken().then(
      (token: string) => { this.token = token; }
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    signOut(this.auth);
    this.token = null;
  }
}