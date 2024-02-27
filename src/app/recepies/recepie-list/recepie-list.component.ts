import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrl: './recepie-list.component.css'
})
export class RecepieListComponent implements OnInit, OnDestroy {
  subscriptio: Subscription;
  recipes: Recipe[];

  constructor(
    private recepieServce: RecipeService,
    private route: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscriptio = this.recepieServce.resepieChenge
    .subscribe((rec: Recipe[]) => {
      this.recipes = rec
    })
    this.recipes = this.recepieServce.getRecepis();
   }

   goNewrecepie(){
    this.route.navigate(['new'], {relativeTo: this.activateRoute})
    // this.route.navigate(['recepie','new'])
   }

   ngOnDestroy(): void {
    this.subscriptio.unsubscribe();
  }

   
}
