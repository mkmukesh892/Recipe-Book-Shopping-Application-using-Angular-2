import { Component, OnInit, OnDestroy, ViewChild, inject } from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeService } from '../../recipes/recipe.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  imports: [FormsModule]
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  private shoppingListService = inject(ShoppingListService);
  private recipeService = inject(RecipeService);

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    console.log(value);
    const ingridentRef = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngrident(this.editedItemIndex, ingridentRef);
    } else {
    this.shoppingListService.onAdd(ingridentRef);
    }
    this.editMode = false;
    form.reset();
    this.recipeService.recipeChanged.next(this.recipeService.getRecipes().slice());
  }
  onClearItem() {
    this.slForm.reset();
    this.editMode = false;
  }
  onDeleteItem() {
    this.onClearItem();
    this.shoppingListService.onDelete(this.editedItemIndex);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
