import { Time } from "@angular/common";
import { Admin } from "../admin";
import { Category } from "../category";
import { Device } from "../device";
import { Image } from "../image";
import { Ingredient } from "../ingredient";
import { Member } from "../member";
import { Type } from "../type";

export class CookingRecipeResponse {
    id!:string;	
	name!:string;	
	preparationTime!:Time;	
	cookingTime!:Time;	
	description!:string;	
	createdCookingRecipe!:string;	
	moderateCookingRecipe?:string;	
	image?:Image;	
	ingredients!:Ingredient[];
	devices!:Device[];	
	category!:Category;
	type!:Type;
	member!:Member;
	admin?:Admin;
}
