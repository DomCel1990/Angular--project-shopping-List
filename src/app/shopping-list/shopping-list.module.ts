import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule,
        ShoppingListRoutingModule,
        SharedModule
    ]
})
export class ShoppingListModule { }