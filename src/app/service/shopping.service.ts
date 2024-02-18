import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Ingredient } from '../model/incredient.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService{

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
  ingredientOutput = new EventEmitter<Ingredient[]>();

  constructor() { }

  getIngrediet(){
    return this.ingredients.slice();
  }

  addElementList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientOutput.emit(this.ingredients.slice())
  }

  addElementsList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientOutput.emit(this.ingredients.slice())
  }


}
