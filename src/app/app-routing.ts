import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', 
    loadComponent: () => import('./recipes/recipes.component').then(m => m.RecipesComponent),
    loadChildren: () => import('./recipes/recipes.routes').then(m => m.recipesRoutes)
  },
  {path: 'shopping-list', loadComponent: () => import('./shopping-list/shopping-list.component').then(m => m.ShoppingListComponent)},
  {path: 'signup', loadComponent: () => import('./auth/signup/signup.component').then(m => m.SignupComponent)},
  {path: 'signin', loadComponent: () => import('./auth/signin/signin.component').then(m => m.SigninComponent)},
  {path: 'not-found', loadComponent: () => import('./error-page/error-page.component').then(m => m.ErrorPageComponent), data: {message: 'page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

