import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const rout: Routes = [
    { path: '', component: ShoppingListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(rout)],
    exports: [RouterModule]
})
export class ShoppingListRoutingModule { }