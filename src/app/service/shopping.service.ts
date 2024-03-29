import { Injectable } from '@angular/core';
import { Ingredient } from '../model/incredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService{

  ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10)
  ]
  ingredientOutput = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  getIngrediet(){
    return this.ingredients.slice();
  }

  getIngredientById(index: number){
    return this.ingredients[index];
  }

  deleteIngredientById(index: number){
   this.ingredients.splice(index, 1).slice();
   this.ingredientOutput.next(this.ingredients.slice())
  }

  updateIngredientById(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientOutput.next(this.ingredients.slice())
  }

  addElementList(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientOutput.next(this.ingredients.slice())
  }

  addElementsList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientOutput.next(this.ingredients.slice())
  }


}
