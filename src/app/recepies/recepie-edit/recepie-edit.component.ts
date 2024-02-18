import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recepie-edit',
  templateUrl: './recepie-edit.component.html',
  styleUrl: './recepie-edit.component.css'
})
export class RecepieEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.params
    .subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = param['id'] !==null;
    })
  }

}
