import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recepe-detail',
  templateUrl: './recepe-detail.component.html',
  styleUrl: './recepe-detail.component.css'
})
export class RecepeDetailComponent implements OnInit{
  recepie: Recipe;
  id: number;

  constructor(
    private recepiService: RecipeService,
    private activateRoute: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe((param: Params) => { 
        this.id = +param['id']
        this.recepie = this.recepiService.getRecepie(this.id);
      });
  }

  addIncredientToShoppinList() {
    this.recepiService.onAddIngridients(this.recepie.ingridients);
    }
  
  goEdit() {
    //posso usare anche un percorso relativo visto che l'id è gia stato preso
    this.router.navigate(['edit'], {relativeTo: this.activateRoute});
    // this.router.navigate(['recepie', this.id, 'edit']);
    }

  onDeleteRecepie() {
    this.recepiService.deleteRecepe(this.id);
    this.router.navigate(['/recepie'])
  }

}
