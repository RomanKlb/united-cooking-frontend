import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookingRecipeRequest } from 'src/app/_common/_models/cookingRecipe/cooking-recipe-request';
import { Member } from 'src/app/_common/_models/member';
import { Admin } from 'src/app/_common/_models/admin';
import { CookingRecipeService } from 'src/app/_common/_services/cooking-recipe.service';
import { TokenStorageService } from 'src/app/_common/_services/token-storage.service';
import { Category } from 'src/app/_common/_models/category';
import { CategoryService } from 'src/app/_common/_services/category.service';

@Component({
  selector: 'app-add-cooking-recipe',
  templateUrl: './add-cooking-recipe.component.html',
  styleUrls: ['./add-cooking-recipe.component.css']
})
export class AddCookingRecipeComponent implements OnInit {

  cookingRecipeDto!: CookingRecipeRequest;
  categories!: Category[];
  multi: boolean = true;

  addCookingRecipeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    preparationTime: [, Validators.required],
    cookingTime: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(10000)]],
    categoryName: ['', Validators.required],
    typeName: [''],
    memberName: ['', Validators.required],
    ingredients: [[], Validators.required],
    devices: [[]]
  });

  submitted = false;
  user!: Admin | Member

  constructor(private cookingRecipeService: CookingRecipeService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private categoryService: CategoryService) {
      this.categoryService.recoveryCategories$().subscribe({
        next: (data) => {
          console.log(data);
          this.categories = data;
        },
        error: (e) => console.error(e)
      });
     }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    
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
    return this.addCookingRecipeForm.get('category') as FormControl;
  }
  get typeForm(): FormControl {
    return this.addCookingRecipeForm.get('type') as FormControl;
  }
  get ingredientsForm(): FormControl {
    return this.addCookingRecipeForm.get('ingredients') as FormControl;
  }
  get devicesForm(): FormControl {
    return this.addCookingRecipeForm.get('devices') as FormControl;
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

  // newCookingRecipe(): void {
  //   this.submitted = false;
  //   this.cookingRecipeDto = {
  //     name: '',
  //     description: '',

  //   };
  // }
}