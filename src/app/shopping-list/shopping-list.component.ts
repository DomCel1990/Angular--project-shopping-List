import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../model/incredient.model';
import { ShoppingService } from '../service/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  subScriptioIngediet: Subscription

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngrediet();
    this.addElement()
  }
  
  addElement(){
    this.subScriptioIngediet = this.shoppingService.ingredientOutput.subscribe(ingred => {
      this.ingredients = ingred
    })
  }

  onEditItem(index: number){
    this.shoppingService.startedEditing.next(index);    
  }

  ngOnDestroy(): void {
    this.subScriptioIngediet.unsubscribe();
  }


}
