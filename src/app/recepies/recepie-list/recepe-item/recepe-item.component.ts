import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../model/recipe.model';
import { RecipeService } from '../../../service/recipe.service';

@Component({
  selector: 'app-recepe-item',
  templateUrl: './recepe-item.component.html',
  styleUrl: './recepe-item.component.css'
})
export class RecepeItemComponent {
  @Input() recipe: Recipe;
  @Input() index: number;

  constructor(
    private recepieServce: RecipeService,
    ) { }

  onEmitter() {
    this.recepieServce.recepiEmitter.next( this.recipe );
  }
}
