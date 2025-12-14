import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  imports: [ReactiveFormsModule]
})
export class RecipeEditComponent implements OnInit {
  readonly route = inject(ActivatedRoute);
  readonly recipeService = inject(RecipeService);
  readonly shoppingListService = inject(ShoppingListService);
  readonly router = inject(Router);
  readonly authService = inject(AuthService);

  id: number;
  editMode = false;
  editForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log(this.editMode);
      }
    );
  }
  private initForm() {
    let recipeName = '';
    let imgPath = '';
    let description = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
          new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      );
        }
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(imgPath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': recipeIngredients
    });
  }
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editForm.value);
    } else {
      this.recipeService.addRecipe(this.editForm.value);
    }
   this.onCancel();
  }
  onAddIngredients() {
    (this.editForm.get('ingredients') as FormArray).push(
      new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onDeleteIngredient(index: number) {
    // this.recipeService.deleteIngredient(this.id);
    // this.router.navigate(['../'], {relativeTo: this.route});
   (this.editForm.get('ingredients') as FormArray).removeAt(index);
  }

  get ingredientsControls() {
  // explicit cast to FormArray to let TS know it has .controls
  return (this.editForm.get('ingredients') as FormArray).controls;
}
}
