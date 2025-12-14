import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  imports: [RecipeListComponent, RouterOutlet]
})
export class RecipesComponent  {
  readonly authService = inject(AuthService);

}
