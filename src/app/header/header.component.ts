import {Component} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
selector : 'app-header',
  templateUrl : './header.component.html',
  styleUrls : ['./header.component.css']
})
export class HeaderComponent {
  constructor(private recipeService: RecipeService, private authService: AuthService, private router: Router) {}
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
