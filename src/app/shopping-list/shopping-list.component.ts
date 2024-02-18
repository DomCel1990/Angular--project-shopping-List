import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../model/incredient.model';
import { ShoppingService } from '../service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngrediet();
    this.addElement()
  }
  
  addElement(){
    this.shoppingService.ingredientOutput.subscribe(v => {
      this.ingredients = v
    })
  }

}
