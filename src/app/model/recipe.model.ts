import { Ingredient } from "./incredient.model";

export class Recipe {
    public id: number;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingridients: Ingredient[];

    constructor(name: string, description: string, imagePath: string, ingridients: Ingredient[]) {
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingridients = ingridients;
    }
}