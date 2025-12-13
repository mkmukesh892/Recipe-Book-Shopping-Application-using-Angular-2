import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [DropdownDirective],
    exports: [
        CommonModule,
        DropdownDirective
    ]
})
export class SharedModule {

}