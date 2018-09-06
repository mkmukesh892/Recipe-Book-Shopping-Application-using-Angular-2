import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private shoppingListService: ShoppingListService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
     this.recipe = this.recipeService.getRecipe(this.id);
     //this.recipe.ingridents
     // console.log('this '+this.recipe.ingridents[0]);
     
     
    
    });
  }
  onAddToShoppingList() {
    this.shoppingListService.onClear();
    this.recipeService.addIngridentsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping-list']);
  }
  onEditRecipe() {
   this.router.navigate(['edit'], {relativeTo: this.route});
   // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
