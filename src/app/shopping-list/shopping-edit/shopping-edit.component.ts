import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../model/incredient.model';
import { ShoppingService } from '../../service/shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  subscription: Subscription;
  indexEdit: number;
  ingredientEdit: Ingredient;
  isEdit = false

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startedEditing
      .subscribe(index => {
        this.indexEdit = index
        this.isEdit = true;
        this.ingredientEdit = this.shoppingService.getIngredientById(index);
        this.form.setValue({
          'name': this.ingredientEdit.name,
          'amount': this.ingredientEdit.amount
        })
      });
  }

  onDelete() {
    this.onClear();
    this.shoppingService.deleteIngredientById(this.indexEdit);
  }

  onClear() {
    this.form.reset();
    this.isEdit = false;
  }

  onSubmit(form: NgForm) {
    const formValue = form.value
    const newIncrdient = new Ingredient(formValue.name, formValue.amount);
    if(!this.isEdit){
      this.shoppingService.addElementList(newIncrdient);
    } else {
      this.shoppingService.updateIngredientById(this.indexEdit,formValue);
    }
    this.isEdit = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



}
