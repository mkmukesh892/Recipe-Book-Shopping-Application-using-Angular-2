import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { DropdownDirective } from "src/app/shared/dropdown.directive";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  imports: [DropdownDirective]
})
export class RecipeDetailComponent implements OnInit {
  readonly recipeService = inject(RecipeService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly shoppingListService = inject(ShoppingListService);
  readonly authService = inject(AuthService);

  recipe: Recipe;
  id: number;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
     this.recipe = this.recipeService.getRecipe(this.id);
    });
  }
  onAddToShoppingList() {
    this.shoppingListService.onClear();
    this.recipeService.addIngridentsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }
  onEditRecipe() {
   this.router.navigate(['edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
