import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-cooking-recipe',
  templateUrl: './add-cooking-recipe.component.html',
  styleUrls: ['./add-cooking-recipe.component.css']
})
export class AddCookingRecipeComponent implements OnInit {

  cookingRecipeDto!: CookingRecipeRequest;
  categories!: string[];
  types!: string[];
  devices!: Device[];
  ingredients!: Ingredient[];

  ingredient!: Ingredient;

  addCookingRecipeForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    preparationTime: ['', Validators.required],
    cookingTime: ['', Validators.required],
    description: ['', [Validators.required, Validators.maxLength(10000)]],
    categoryName: ['', Validators.required],
    typeName: '',
    ingredientsName: [[], Validators.required],
    devicesName: [[]]
  });

  submitted = false;
  user!: Admin | Member

  selectedIngredients: string[] = [];
  selectedDevices: string[] = [];
  dropdownSettingsIngredients = {};
  dropdownSettingsDevices = {};

  message = "";

  modalRef?: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(private cookingRecipeService: CookingRecipeService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private categoryService: CategoryService,
    private typeService: TypeService,
    private ingredientService: IngredientService,
    private deviceService: DeviceService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.chargedCategories();
    this.chargedTypes();
    this.chargedDevices();
    this.chargedIngredients();
    this.chargedSettingsDropdownIngredients();
    this.chargedSettingsDropdownDevices();
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
  }

  onSelectIngredient(item: any) {
    this.selectedIngredients.push(item.name);
    console.log(this.selectedIngredients)
    return this.selectedIngredients;
  }

  onDeSelectIngredient(item: any) {
    this.selectedIngredients.splice(this.selectedIngredients.findIndex(x => x === item.name), 1)
    console.log(this.selectedIngredients);
  }

  onSelectDevice(item: any) {
    this.selectedDevices.push(item.name);
    console.log(this.selectedDevices)
  }

  onDeSelectDevice(item: any) {
    this.selectedDevices.splice(this.selectedDevices.findIndex(x => x === item.name), 1)
    console.log(this.selectedDevices);
  }

  chargedSettingsDropdownIngredients() {
    this.dropdownSettingsIngredients = {
      singleSelection: false,
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'rechercher',
      noFilteredDataAvailablePlaceholderText: 'Aucun ingrédient de ce nom',
      noDataAvailablePlaceholderText: 'Aucun ingrédient trouvé',
      enableCheckAll: false
    };
  }

  chargedSettingsDropdownDevices() {
    this.dropdownSettingsDevices = {
      singleSelection: false,
      textField: 'name',
      allowSearchFilter: true,
      searchPlaceholderText: 'rechercher',
      noFilteredDataAvailablePlaceholderText: 'Aucun appareils trouvé',
      enableCheckAll: false
    };
  }

  openModalCreateOk(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  saveCookingRecipe(): void {
    this.message = '';
    this.cookingRecipeDto = this.constructCookingRecipeDto();
    console.log(this.cookingRecipeDto);

    this.cookingRecipeService.addCookingRecipe$(this.cookingRecipeDto)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
          this.newCookingRecipe();
          this.router.navigate(['mes-recettes']);
        },
        error: (e) => {
          this.submitted = false;
          this.message = e.error;
          // this.reconstructCookingRecipeDto();
        }
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
    return this.addCookingRecipeForm.get('typeName') as FormControl;
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
      ingredients: this.selectedIngredients,
      devices: this.selectedDevices
    }

  }
  // reconstructCookingRecipeDto(): void {
  //   this.addCookingRecipeForm.patchValue({
  //     'name': this.nameForm.value,
  //     'preparationTime': this.preparationTimeForm.value,
  //     'cookingTime': this.cookingTimeForm.value,
  //     'description': this.descriptionForm.value,
  //     'categoryName':  this.categoryForm.value,
  //     'typeName': this.typeForm.value,
  //     'ingredientsName': this.selectedIngredients,
  //     'devicesName': this.selectedDevices
  //   })
  // }

  chargedCategories(): any {
    this.categories = [];
    return this.categoryService.recoveryCategories$().subscribe({
      next: (data) => {
        data.forEach(((element: Category) => {
          this.categories.push(element.name);
        }));
      },
      error: (e: any) => console.error(e)
    });
  }

  chargedTypes(): any {
    this.types = [];
    return this.typeService.recoveryTypes$().subscribe({
      next: (data) => {
        data.forEach(((element: Type) => {
          this.types.push(element.name);
        }));
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

  createRecette() {
    this.selectedIngredients = ['Oignon', 'Lait'];
    this.selectedDevices = ['Thermomix'];

    this.addCookingRecipeForm.patchValue({
      'name': 'TEST',
      'preparationTime': '00:45',
      'cookingTime': '00:45',
      'description': 'TEST TEST TEST',
      'categoryName': 'Plat',
      'typeName': 'Junk food',
      'ingredientsName': ['Oignon', 'Lait'],
      'devicesName': ['Thermomix']
    })
    console.log(this.addCookingRecipeForm.value)
  }

  newCookingRecipe(): void {
    this.submitted = false;
    this.addCookingRecipeForm.patchValue({
      'name': '',
      'preparationTime': '',
      'cookingTime': '',
      'description': '',
      'categoryName': '',
      'typeName': '',
      'ingredientsName': [],
      'devicesName': []
    })
  }

}