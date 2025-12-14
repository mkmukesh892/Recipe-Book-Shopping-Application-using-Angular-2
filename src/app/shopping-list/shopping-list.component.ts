import { Component, computed, inject } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  imports: [ShoppingEditComponent]
})
export class ShoppingListComponent {
  private shoppingListService = inject(ShoppingListService);

  // Use computed signal directly
  ingredients = computed(() => this.shoppingListService.ingredientsList());

  onEditItem(index: number) {
    this.shoppingListService.setEditingIndex(index);
  }
}