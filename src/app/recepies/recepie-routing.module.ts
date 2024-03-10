import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../service/auth.guard";
import { RecepieResolverService } from "../service/recepie-resolver.service";
import { RecepeDetailComponent } from "./recepe-detail/recepe-detail.component";
import { RecepieEditComponent } from "./recepie-edit/recepie-edit.component";
import { RecepieStartComponent } from "./recepie-start/recepie-start.component";
import { RecepiesComponent } from "./recepies.component";

const route: Routes = [
    {
        path: '',
        component: RecepiesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecepieStartComponent },
            { path: 'new', component: RecepieEditComponent },
            { path: ':id', component: RecepeDetailComponent, resolve: [RecepieResolverService] },
            { path: ':id/edit', component: RecepieEditComponent, resolve: [RecepieResolverService] },
        ]
    },
]
@NgModule({
    imports: [
        RouterModule.forChild(route)
    ],
    exports: [
        RouterModule
    ]
})
export class RecepieRoutingModule { }