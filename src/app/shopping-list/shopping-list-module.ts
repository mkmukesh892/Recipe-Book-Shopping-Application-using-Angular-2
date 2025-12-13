import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { CommonModule } from "../../../node_modules/@angular/common";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ShoppingEditComponent,
        ShoppingListComponent
    ],
    exports: []
})
export class ShoppingListModule {

}