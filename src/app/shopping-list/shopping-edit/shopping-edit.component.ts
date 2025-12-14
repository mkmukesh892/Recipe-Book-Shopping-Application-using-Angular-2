import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  imports: [FormsModule]
})
export class ShoppingEditComponent {
  private shoppingListService = inject(ShoppingListService);
  readonly slForm = viewChild<NgForm>('f');
  editMode = computed(() => this.shoppingListService.isEditing());
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor() {
    // Use effect to react to editing changes
    effect(() => {
      const index = this.shoppingListService.editingItemIndex();
      if (index !== null) {
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        setTimeout(() => {
          this.slForm()?.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        });
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingridentRef = new Ingredient(value.name, value.amount);
    if (this.editMode()) {
      this.shoppingListService.updateIngrident(this.editedItemIndex, ingridentRef);
    } else {
      this.shoppingListService.onAdd(ingridentRef);
    }
    this.resetForm(form);
  }

  onClearItem() {
    this.slForm()?.reset();
    this.shoppingListService.setEditingIndex(null);
  }

  onDeleteItem() {
    this.shoppingListService.onDelete(this.editedItemIndex);
    this.resetForm(this.slForm());
  }

  private resetForm(form: NgForm) {
    form?.reset();
    this.shoppingListService.setEditingIndex(null);
  }
}