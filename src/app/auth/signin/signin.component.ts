import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  imports: [FormsModule]
})
export class SigninComponent  {
  private authService = inject(AuthService);
  
  onSignIn(form: NgForm) {
    const email= form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
  }
}
