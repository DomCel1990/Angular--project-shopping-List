import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecepeDetailComponent } from "./recepe-detail/recepe-detail.component";
import { RecepieEditComponent } from "./recepie-edit/recepie-edit.component";
import { RecepeItemComponent } from "./recepie-list/recepe-item/recepe-item.component";
import { RecepieListComponent } from "./recepie-list/recepie-list.component";
import { RecepieStartComponent } from "./recepie-start/recepie-start.component";
import { RecepiesComponent } from "./recepies.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { RecepieRoutingModule } from "./recepie-routing.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        RecepiesComponent,
        RecepieListComponent,
        RecepeDetailComponent,
        RecepeItemComponent,
        RecepieStartComponent,
        RecepieEditComponent,
    ],
    imports: [
        ReactiveFormsModule,
        RouterModule,
        RecepieRoutingModule,
        SharedModule
    ]

})
export class RecepiModule { }