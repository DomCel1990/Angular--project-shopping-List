import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RecepiesComponent } from './recepies/recepies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecepeItemComponent } from './recepies/recepie-list/recepe-item/recepe-item.component';
import { RecepieStartComponent } from './recepies/recepie-start/recepie-start.component';
import { RecepeDetailComponent } from './recepies/recepe-detail/recepe-detail.component';
import { RecepieEditComponent } from './recepies/recepie-edit/recepie-edit.component';

const router: Routes = [
  {path: '', redirectTo: '/recepie', pathMatch: 'full'},
  {path: 'recepie', component: RecepiesComponent, children: [
    {path: '', component: RecepieStartComponent},
    { path: 'new', component: RecepieEditComponent},
    { path: ':id', component: RecepeDetailComponent},
    { path: ':id/edit', component: RecepieEditComponent},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
