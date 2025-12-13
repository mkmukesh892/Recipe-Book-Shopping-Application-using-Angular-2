import { Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

export const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    loadComponent: () => import('./recipes/recipes.component').then(m => m.RecipesComponent), 
    children: [
      {path: '', loadComponent: () => import('./recipes/recipe-start/recipe-start.component').then(m => m.RecipeStartComponent)},
      {path: 'new', loadComponent: () => import('./recipes/recipe-edit/recipe-edit.component').then(m => m.RecipeEditComponent), canActivate: [AuthGuardService]},
      {path: ':id', loadComponent: () => import('./recipes/recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)},
      {path: ':id/edit', loadComponent: () => import('./recipes/recipe-edit/recipe-edit.component').then(m => m.RecipeEditComponent), canActivate: [AuthGuardService]}
    ]
  },
  {path: 'shopping-list', loadComponent: () => import('./shopping-list/shopping-list.component').then(m => m.ShoppingListComponent)},
  {path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent)},
  {path: 'signin', loadComponent: () => import('./auth/signin/signin.component').then(m => m.SigninComponent)},
  {path: 'not-found', loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent), data: {message: 'page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

