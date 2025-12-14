import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
  imports: [RouterLink]
})
export class RecipeItemComponent   {
  readonly recipeService = inject(RecipeService);
  readonly recipe =input<Recipe>();
  readonly index = input(0);
}
