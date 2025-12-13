import { Injectable, inject } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject, throwError } from 'rxjs';
import {Http, Response} from '@angular/http';
import {map, catchError} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private shoppingListService = inject(ShoppingListService);
  private http = inject(Http);
  private authService = inject(AuthService);

  recipeChanged = new Subject<Recipe[]>();
  ingridentsChanged = new Subject<Ingredient[]>();
  // private recipes = [new Recipe(
  //   'Palak Panner',
  //   'The taste of this recipe is yummy!',
  //   'https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--488691_11.jpg?itok=ExaTspz1',
  //   [new Ingredient('Palak', 2),
  //    new Ingredient('Panner', 4)]),
  //   new Recipe(
  //     'Mommos',
  //     'delighted tasty mommos',
  //     'http://media2.sailusfood.com/wp-content/uploads/2016/03/recipe-of-momos.jpg',
  //     [new Ingredient('Meat', 3),
  //     new Ingredient('Maida', 5)]),
  //   new Recipe(
  //       'Jamaican Jerk Chicken',
  //       `The best jerk recipe we've ever tasted, which we first published in 1995, is fragrant, fiery hot and smoky all at once.`,
  //       `https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/50/2012/07/WH-Outdoors-097.jpg`,
  //     [new Ingredient('Chicken legs', 4),
  //      new Ingredient('Onion', 5),
  //      new Ingredient('lime', 8)]),
  //];
  private recipes = [];
  getRecipes() {
    return this.recipes.slice();
  }
  addIngridentsToShoppingList(ingridents: Ingredient[]) {
    this.shoppingListService.addIngridents(ingridents);
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
    // this.ingridentsChanged.next(this.recipes[index].ingridents.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteIngredient(index: number) {
    this.recipes[index].ingredients.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  saveRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://recipebook-b6a08.firebaseio.com/data.json?auth='+token, this.recipes).pipe(map(
    (data: Response) => {//console.log(data);
    const recipe: any = data;
    return recipe;
    },
    (error) => {console.log(error)}
    ),
  catchError(
    (error: Response) => { return throwError('something went wrong')}
  ));
  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
  fetchRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://recipebook-b6a08.firebaseio.com/data.json?auth=' +token).pipe(map(
    (response: Response) => {
      const recipes: Recipe[] = response.json();
      for(const recipe of recipes) {
        // console.log(recipe);
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return recipes;
    }
    ))
    .subscribe(
      (recipes: Recipe[]) => { 
        // const recipes: Recipe[] = response.json();
        this.setRecipes(recipes);
       }
    );
  }
}
