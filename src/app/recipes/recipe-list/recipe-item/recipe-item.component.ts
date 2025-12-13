import { Component, Input, OnInit, inject } from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  private recipeService = inject(RecipeService);

  @Input() recipe: Recipe;
  @Input() index: number;
  ngOnInit() {
  }
  /*onRecipeSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }*/
}
