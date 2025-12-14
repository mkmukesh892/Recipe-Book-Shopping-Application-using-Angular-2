import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal, computed } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private shoppingListService = inject(ShoppingListService);
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private recipes = signal<Recipe[]>([]);
  
  // Expose as readonly signal
  recipeList = computed(() => this.recipes());

  getRecipes() {
    return this.recipes().slice();
  }

  addIngridentsToShoppingList(ingridents: Ingredient[]) {
    this.shoppingListService.addIngridents(ingridents);
  }

  getRecipe(index: number) {
    return this.recipes()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.update(recipes => [...recipes, recipe]);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes.update(recipes => {
      const updated = [...recipes];
      updated[index] = newRecipe;
      return updated;
    });
  }

  deleteRecipe(index: number) {
    this.recipes.update(recipes => {
      const updated = [...recipes];
      updated.splice(index, 1);
      return updated;
    });
  }

  deleteIngredient(index: number) {
    this.recipes.update(recipes => {
      const updated = [...recipes];
      updated[index].ingredients.splice(index, 1);
      return updated;
    });
  }

  saveRecipes() {
    const token = this.authService.getToken();
    return this.http.put(
      'https://recipebook-b6a08.firebaseio.com/data.json?auth=' + token,
      this.recipes()
    ).pipe(
      catchError((error) => throwError(() => new Error('Failed to save recipes')))
    );
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes.set(recipes);
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    this.http.get<Recipe[]>(
      'https://recipebook-b6a08.firebaseio.com/data.json?auth=' + token
    ).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (!response) {
          return [];
        }
        const recipesArray: Recipe[] = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            const recipe = response[key];
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
            recipesArray.push(recipe);
          }
        }
        return recipesArray;
      }),
      catchError((error) => {
        console.error('Error fetching recipes:', error);
        return throwError(() => new Error('Failed to fetch recipes'));
      })
    ).subscribe((recipes: Recipe[]) => this.setRecipes(recipes));
  }
}