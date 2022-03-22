import { Time } from "@angular/common";

export interface CookingRecipeRequest {
	name:string;
	preparationTime:string;
    cookingTime:string;
	description:string;
    categoryName:string;
    typeName:string;
    memberPseudo:string;
    ingredients:string[];
    devices:string[];
}
