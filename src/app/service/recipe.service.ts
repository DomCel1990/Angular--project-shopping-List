import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../model/incredient.model';
import { ShoppingService } from './shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  resepieChenge = new Subject<Recipe[]>();
  // private recipes: Recipe[] =
  //   [
  //     new Recipe(
  //       'Carbonata',
  //       'Una grande ricetta romana',
  //       'https://blog.giallozafferano.it/albe/wp-content/uploads/2020/08/15FA1142-B5FA-410C-878B-2B8745B85F64.jpeg',
  //       [new Ingredient('Pancetta', 5), new Ingredient('Pasta', 5)]
  //     ),
  //     new Recipe(
  //       'Hamburger',
  //       'Carne Chianina e insalta',
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkFvpH71dKBRZcIzXLy4x-FvJiEJGHaEZCw&usqp=CAU',
  //       [new Ingredient('Carne', 5), new Ingredient('Insalata', 5)]
  //     ),

  //   ];
  recepiEmitter = new Subject<Recipe>();
  private recipes: Recipe[] = []

  constructor(private shoppingService: ShoppingService) { }

  setRecepie(recepes: Recipe[]) {
    this.recipes = recepes;
    this.resepieChenge.next(this.recipes.slice());
  }
  
  getRecepis(): Recipe[] {
    return this.recipes.slice();
  }

  getRecepie(index: number) {
    // ottengo l'elemento in base alla sua posizione
    return this.recipes.slice()[index];
  }

  onAddIngridients(ingredient: Ingredient[]) {
    this.shoppingService.addElementsList(ingredient);
  }

  addRecepi(recepe: Recipe) {
    this.recipes.push(recepe);
    this.resepieChenge.next(this.recipes.slice());
  }

  updateRecepie(index: number, recepie: Recipe) {
    this.recipes[index] = recepie;
    this.resepieChenge.next(this.recipes.slice());
  }

  deleteRecepe(index: number) {
    this.recipes.splice(index, 1);
    this.resepieChenge.next(this.recipes.slice());
  }
}
