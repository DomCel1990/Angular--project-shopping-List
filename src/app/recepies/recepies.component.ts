import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recepies',
  templateUrl: './recepies.component.html',
  styleUrl: './recepies.component.css'
})
export class RecepiesComponent implements OnInit {
  recepie: Recipe;
  
  constructor(private recepieServce: RecipeService) { }

  ngOnInit(): void {
    this.recepieServce.recepiEmitter.subscribe(v => { this.recepie = v })
  }

}
