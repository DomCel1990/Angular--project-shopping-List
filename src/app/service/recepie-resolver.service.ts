import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "../model/recipe.model";
import { Observable } from "rxjs";
import { DataStoregeService } from "./data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})
export class RecepieResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorege: DataStoregeService,
        private recepieSer: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        // non serve fare la sottoscrizione qui

        const recepie = this.recepieSer.getRecepis();
        if (recepie.length === 0) {
            return this.dataStorege.ferchData();
        } else return recepie
    }

}