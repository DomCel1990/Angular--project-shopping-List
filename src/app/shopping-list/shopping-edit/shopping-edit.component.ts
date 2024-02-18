import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../model/incredient.model';
import { ShoppingService } from '../../service/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('inputName') inputName: ElementRef;
  @ViewChild('inputNumber') inputNumber: ElementRef;

  constructor(private shoppingService: ShoppingService){}

  onAdd() {
    const inputNameConst = this.inputName.nativeElement.value;
    const inpupNumberCost = this.inputNumber.nativeElement.value;
    const newIncrdient = new Ingredient(inputNameConst, inpupNumberCost);
    this.shoppingService.addElementList(newIncrdient);
  }



}
