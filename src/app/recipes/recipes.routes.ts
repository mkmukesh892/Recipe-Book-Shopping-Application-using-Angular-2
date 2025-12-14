import { Routes } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';

export const recipesRoutes: Routes = [
  {path: '', loadComponent: () => import('./recipe-start/recipe-start.component').then(m => m.RecipeStartComponent)},
  {path: 'new', loadComponent: () => import('./recipe-edit/recipe-edit.component').then(m => m.RecipeEditComponent), canActivate: [AuthGuardService]},
  {path: ':id', loadComponent: () => import('./recipe-detail/recipe-detail.component').then(m => m.RecipeDetailComponent)},
  {path: ':id/edit', loadComponent: () => import('./recipe-edit/recipe-edit.component').then(m => m.RecipeEditComponent), canActivate: [AuthGuardService]}
];