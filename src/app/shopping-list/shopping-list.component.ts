import { Component, OnChanges, OnDestroy, OnInit, inject } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subject, Subscription, takeUntil} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  private shoppingListService = inject(ShoppingListService);
  private destroy$ = new Subject<void>();
  ingredients: Ingredient[] =[];

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngridents();
   this.shoppingListService.ingredientsChanged.pipe(takeUntil(this.destroy$)).subscribe(
      (ingridents: Ingredient[]) => {
        this.ingredients = ingridents; });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }
}
