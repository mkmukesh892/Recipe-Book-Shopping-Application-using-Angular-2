import { Component, OnInit, inject } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);
  private shoppingListService = inject(ShoppingListService);
  private router = inject(Router);
  private authService = inject(AuthService);

  id: number;
  editMode = false;
  editForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        // console.log(this.editMode);
      }
    );
  }
  private initForm() {
    let recipeName = '';
    let imgPath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      description = recipe.description;
      if(recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
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
    const newRecipe = new Recipe(
      this.editForm.value['name'],
      this.editForm.value['description'],
      this.editForm.value['imagePath'],
      this.editForm.value['ingredients']
      
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.editForm.value);
    } else {
      this.recipeService.addRecipe(this.editForm.value);
    }
   // console.log(this.editForm.value);
   this.onCancel();
  }
  onAddIngredients() {
    (<FormArray>this.editForm.get('ingredients')).push(
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
   (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }
}
