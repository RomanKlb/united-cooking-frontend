import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookingRecipeRequest } from 'src/app/_common/_models/cookingRecipe/cooking-recipe-request';
import { Member } from 'src/app/_common/_models/member';
import { Admin } from 'src/app/_common/_models/admin';
import { CookingRecipeService } from 'src/app/_common/_services/_cooking-recipe/cooking-recipe.service';
import { TokenStorageService } from 'src/app/_common/_services/_jwt/token-storage.service';
import { Category } from 'src/app/_common/_models/category';
import { CategoryService } from 'src/app/_common/_services/_category/category.service';
import { Type } from 'src/app/_common/_models/type';
import { TypeService } from 'src/app/_common/_services/_type/type.service';
import { Device } from 'src/app/_common/_models/device';
import { Ingredient } from 'src/app/_common/_models/ingredient';
import { IngredientService } from 'src/app/_common/_services/_ingredient/ingredient.service';
import { DeviceService } from 'src/app/_common/_services/_device/device.service';

@Component({
  selector: 'app-add-cooking-recipe',
  templateUrl: './add-cooking-recipe.component.html',
  styleUrls: ['./add-cooking-recipe.component.css']
})
export class AddCookingRecipeComponent implements OnInit {

  cookingRecipeDto!: CookingRecipeRequest;
  categories!: Category[];
  types!: Type[];
  devices! : Device[];
  ingredients! : Ingredient[];

  ingredient! : Ingredient;

  addCookingRecipeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    preparationTime: [, Validators.required],
    cookingTime: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(10000)]],
    categoryName: ['', Validators.required],
    typeName: [''],
    memberName: ['', Validators.required],
    ingredientsName: [[], Validators.required],
    devicesName: [[]]
  });

  submitted = false;
  user!: Admin | Member

  selectedIngredients:string[] = [];
  selectedDevices = [];
  deletedIngredients = [];
  deletedDevices = [];
  dropdownSettings = {};


  constructor(private cookingRecipeService: CookingRecipeService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private ingredientService : IngredientService,
    private deviceService : DeviceService
    ) {
      this.chargedCategories();
      this.chargedTypes();
      this.chargedDevices();
      this.chargedIngredients();
     }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
   
    this.dropdownSettings = {
      singleSelection: false,
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'rechercher',
      noFilteredDataAvailablePlaceholderText: 'Aucun ingrédient trouvé'
    };
  }

  onSelectIngredient(item: any) {
    this.selectedIngredients.push(item.name);
    console.log(this.selectedIngredients)
  }

  onDeSelectIngredient(item:any) {
    this.selectedIngredients.splice(this.selectedIngredients.findIndex(x => x === item.name), 1)
    console.log(this.selectedIngredients);
  }

  onSelectAllIngredient(items: any) {
    console.log(items);
  }

  saveCookingRecipe(): void {
    this.cookingRecipeDto = this.constructCookingRecipeDto();

    this.cookingRecipeService.addCookingRecipe$(this.cookingRecipeDto)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  get nameForm(): FormControl {
    return this.addCookingRecipeForm.get('name') as FormControl;
  }
  get preparationTimeForm(): FormControl {
    return this.addCookingRecipeForm.get('preparationTime') as FormControl;
  }
  get cookingTimeForm(): FormControl {
    return this.addCookingRecipeForm.get('cookingTime') as FormControl;
  }
  get descriptionForm(): FormControl {
    return this.addCookingRecipeForm.get('description') as FormControl;
  }
  get categoryForm(): FormControl {
    return this.addCookingRecipeForm.get('categoryName') as FormControl;
  }
  get typeForm(): FormControl {
    return this.addCookingRecipeForm.get('type') as FormControl;
  }
  get ingredientsForm(): FormControl {
    return this.addCookingRecipeForm.get('ingredientsName') as FormControl;
  }
  get devicesForm(): FormControl {
    return this.addCookingRecipeForm.get('devicesName') as FormControl;
  }

  constructCookingRecipeDto(): CookingRecipeRequest {
    return {
      name: this.nameForm.value,
      preparationTime: this.preparationTimeForm.value,
      cookingTime: this.cookingTimeForm.value,
      description: this.descriptionForm.value,
      categoryName: this.categoryForm.value,
      typeName: this.typeForm.value,
      memberPseudo: this.user.pseudo,
      ingredients: this.ingredientsForm.value,
      devices: this.devicesForm.value
    }
  }

  chargedCategories(): any {
    return this.categoryService.recoveryCategories$().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (e) => console.error(e)
    });
  }

  chargedTypes(): any {
    return this.typeService.recoveryTypes$().subscribe({
      next: (data) => {
        this.types = data;
      },
      error: (e) => console.error(e)
    });
  }

  chargedIngredients(): any {
    return this.ingredientService.recoveryIngredients$().subscribe({
      next: (data) => {
        console.log(data)
        this.ingredients = data;
      },
      error: (e) => console.error(e)
    });
  }

  chargedDevices(): any {
    return this.deviceService.recoveryDevices$().subscribe({
      next: (data) => {
        console.log(data)
        this.devices = data;
      },
      error: (e) => console.error(e)
    });
  }

  // newCookingRecipe(): void {
  //   this.submitted = false;
  //   this.cookingRecipeDto = {
  //     name: '',
  //     description: '',

  //   };
  // }
}