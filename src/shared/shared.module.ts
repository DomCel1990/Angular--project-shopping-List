import { NgModule } from "@angular/core";
import { DropdownDirective } from "../app/directive/dropdown.directive";
import { SpinnerComponent } from "../app/spinner/spinner.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        DropdownDirective,
        SpinnerComponent,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DropdownDirective,
        SpinnerComponent,
        CommonModule
    ]
})
export class SharedModule { }