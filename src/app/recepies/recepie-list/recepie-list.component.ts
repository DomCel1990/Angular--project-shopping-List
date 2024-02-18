import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recepie-list',
  templateUrl: './recepie-list.component.html',
  styleUrl: './recepie-list.component.css'
})
export class RecepieListComponent implements OnInit {

  recipes: Recipe[];

  constructor(
    private recepieServce: RecipeService,
    private route: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recepieServce.getRecepis();
   }

   goNewrecepie(){
    this.route.navigate(['new'], {relativeTo: this.activateRoute})
    // this.route.navigate(['recepie','new'])
   }
   
}
