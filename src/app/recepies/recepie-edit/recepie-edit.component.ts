import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../service/recipe.service';


@Component({
  selector: 'app-recepie-edit',
  templateUrl: './recepie-edit.component.html',
  styleUrl: './recepie-edit.component.css'
})
export class RecepieEditComponent implements OnInit {
  id: number;
  editMode = false;
  recepiForm!: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private recepieService: RecipeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activateRoute.params
      .subscribe((param: Params) => {
        this.id = +param['id'];
        this.editMode = param['id'] !== undefined;
        this.initiForm();
      })
  }

  private initiForm() {
    let recepieName = '';
    let recepiImage = '';
    let recepiDescription = '';
    let recepeIngredients = new FormArray([]);

    if (this.editMode) {
      const recepe = this.recepieService.getRecepie(this.id);
      if (recepe) {
        recepieName = recepe.name;
        recepiImage = recepe.imagePath;
        recepiDescription = recepe.description;

        // recepe['ingridients'] è come dire recepe.ingridients
        if (recepe['ingridients']) {
          for (let ingridient of recepe.ingridients) {
            recepeIngredients.push(new FormGroup({
              'name': new FormControl(ingridient.name, Validators.required),
              'amount': new FormControl(ingridient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
          }
        }
      }
    }
    this.recepiForm = new FormGroup({
      'name': new FormControl(recepieName, Validators.required),
      'imagePath': new FormControl(recepiImage, Validators.required),
      'description': new FormControl(recepiDescription, Validators.required),
      'ingridients': recepeIngredients
    });
  }

  getControl() {
    return (<FormArray>this.recepiForm.get('ingridients')).controls;
  }

  onSubmit() {

    //posso comentare tutte e passare direttamente il valore del form
    // const recepe = new Recipe(
    //   // si può usare anche il punto
    //   this.recepiForm.value.name,
    //   this.recepiForm.value['imagePath'],
    //   this.recepiForm.value['description'],
    //   this.recepiForm.value['ingridients']
    // )
    // console.log(recepe);
    if (this.editMode) {
      this.recepieService.updateRecepie(this.id, this.recepiForm.value);
      
    } else {
      this.recepieService.addRecepi(this.recepiForm.value)
      this.onClean();
    }
  }

  onAddIngredient() {
    (<FormArray>this.recepiForm.get('ingridients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onClean() {
    this.router.navigate(['../'], {relativeTo: this.activeRoute})
    // this.recepiForm.reset();
  }

  onDelete(index: number) {
    (<FormArray>this.recepiForm.get('ingridients')).removeAt(index);
  }
}
