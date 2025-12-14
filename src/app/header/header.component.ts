import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DropdownDirective } from "../shared/dropdown.directive";

@Component({
selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css'],
  imports: [RouterLink, RouterLinkActive, DropdownDirective]
})
export class HeaderComponent {
  readonly recipeService = inject(RecipeService);
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  onSaveRecipes() {
    this.recipeService.saveRecipes().subscribe(
      (data: Response) => {console.log(data.json())},
      (error: Response) => console.log(error)
    )
  }
  onFetchRecipes() {
    this.recipeService.fetchRecipes();
  }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
