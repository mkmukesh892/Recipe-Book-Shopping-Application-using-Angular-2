import { computed, Injectable, signal } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]);

  private editingIndex = signal<number | null>(null);

  // Expose as computed signals (readonly)
  ingredientsList = computed(() => this.ingredients());
  isEditing = computed(() => this.editingIndex() !== null);
  editingItemIndex = computed(() => this.editingIndex());

  getIngridents() {
    return this.ingredients().slice();
  }

  getIngredient(index: number) {
    return this.ingredients()[index];
  }

  onAdd(ingrident: Ingredient) {
    this.ingredients.update(ing => [...ing, ingrident]);
  }

  onClear() {
    this.ingredients.set([]);
  }

  onDelete(index: number) {
    this.ingredients.update(ing => {
      const updated = [...ing];
      updated.splice(index, 1);
      return updated;
    });
  }

  addIngridents(ingridents: Ingredient[]) {
    this.ingredients.update(ing => [...ing, ...ingridents]);
  }

  updateIngrident(index: number, newIngrident: Ingredient) {
    this.ingredients.update(ing => {
      const updated = [...ing];
      updated[index] = newIngrident;
      return updated;
    });
  }

  setEditingIndex(index: number | null) {
    this.editingIndex.set(index);
  }
}