import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import {  RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  imports: [RecipeListComponent, RouterOutlet]
})
export class RecipesComponent  {
  readonly authService = inject(AuthService);

}
