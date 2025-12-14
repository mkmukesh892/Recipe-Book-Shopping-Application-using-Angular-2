import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RecipeService } from '../recipe.service';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  imports: [RecipeItemComponent]
})
export class RecipeListComponent implements OnInit {
  readonly recipeService = inject(RecipeService);
  readonly router = inject(Router);
  readonly route = inject(ActivatedRoute);
  readonly authService = inject(AuthService);

  // Use signal computed value directly in template
  recipes = computed(() => this.recipeService.recipeList());

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.recipeService.fetchRecipes();
    }
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}