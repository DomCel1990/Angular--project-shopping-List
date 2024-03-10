import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";
import { Recipe } from "../model/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class DataStoregeService {

    constructor(
        private http: HttpClient,
        private recepieService: RecipeService,
        private authServuce: AuthService
    ) {

    }

    storeRecepie() {
        const recepie = this.recepieService.getRecepis();

        return this.http.put('https://spesa-progetto-default-rtdb.firebaseio.com/recepie.json', recepie).subscribe(recepie => {
            console.log(recepie);
        })
    }

    ferchData() {

        return this.http.get<Recipe[]>('https://spesa-progetto-default-rtdb.firebaseio.com/recepie.json')
        .pipe(
            map(recepie => {
                return recepie.map(rece => {
                    return { ...rece, ingridients: rece.ingridients ? rece.ingridients : [] }
                })
            })
            ,
            tap(recepie => {
                console.log(recepie);
                this.recepieService.setRecepie(recepie)
            })
        )
    }
}