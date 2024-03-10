import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const router: Routes = [
  { path: '', redirectTo: '/recepie', pathMatch: 'full' },

  // implemento il caricamento pigro (lazy loading)
  {
    path: 'recepie', loadChildren: () =>
      import('./recepies/recepie.module')
        .then(module => module.RecepiModule)
  },
  {
    path: 'shopping-list', loadChildren: () =>
      import('./shopping-list/shopping-list.module')
        .then(module => module.ShoppingListModule)
  },
  {
    path: 'auth', loadChildren: () =>
      import('./auth/auth.module')
        .then(module => module.AuthModule)
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router, {preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
