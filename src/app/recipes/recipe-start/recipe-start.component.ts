import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent {
  readonly authService = inject(AuthService);
}
