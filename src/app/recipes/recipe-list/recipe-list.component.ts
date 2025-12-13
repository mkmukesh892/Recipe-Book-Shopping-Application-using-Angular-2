import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  imports: [RecipeItemComponent]
})
export class RecipeListComponent implements OnInit, OnDestroy {
  readonly recipeService = inject(RecipeService);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly authService = inject(AuthService);

  recipes: Recipe[] ;
  subscription: Subscription;
   onRecipeSelected = new Subject<Recipe>();

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.fetchRecipes();
  }
  onSelect(recipe: Recipe) {
    this.onRecipeSelected.next(recipe);
  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
