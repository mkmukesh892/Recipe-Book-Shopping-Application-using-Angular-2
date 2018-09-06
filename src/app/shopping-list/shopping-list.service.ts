import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  constructor() { }
  getIngridents() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  onAdd(ingrident: Ingredient) {
    this.ingredients.push(ingrident);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  onClear() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  onDelete(index: number) {
    this.ingredients.splice(index , 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngridents(ingridents: Ingredient[]) {
    this.ingredients.push(...ingridents);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngrident(index: number, newIngrident: Ingredient) {
    this.ingredients[index] = newIngrident;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
