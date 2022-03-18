import { Component, OnInit } from '@angular/core';
import { CookingRecipeResponse } from 'src/app/_common/_models/cookingRecipe/cooking-recipe-response';
import { CookingRecipeService } from 'src/app/_common/_services/_cooking-recipe/cooking-recipe.service';

@Component({
  selector: 'app-list-cooking-recipe',
  templateUrl: './list-cooking-recipe.component.html',
  styleUrls: ['./list-cooking-recipe.component.css']
})
export class ListCookingRecipeComponent implements OnInit {

  cookingRecipes!: CookingRecipeResponse[];

  currentCookingRecipe: CookingRecipeResponse = {
    id: '',
    name: '',
    preparationTime: {
      hours: 0,
      minutes: 0
    },
    cookingTime: {
      hours: 0,
      minutes: 0
    },
    description: '',
    createdCookingRecipe: '',
    ingredients: [],
    devices: [],
    category: {
      id: '',
      name: ''
    },
    type: {
      id: '',
      name: ''
    },
    member: {
      id: '',
      pseudo: '',
      email: '',
      name: '',
      surname: ''
    }
  };

  currentIndex = -1;
  // title = '';

  filteredCookingRecipes!: CookingRecipeResponse[];
  filter: any = '';

  constructor(private cookingRecipeService: CookingRecipeService) {
    this.retrieveCookingRecipesModerateByAdmin();
   }

  ngOnInit(): void {
  }

  retrieveCookingRecipesModerateByAdmin(): void {
    this.cookingRecipeService.recoveryAllCookingRecipesModerateByAdmin$()
      .subscribe({
        next: (data) => {
          this.cookingRecipes = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveCookingRecipesModerateByAdmin();
    this.currentCookingRecipe = {
      id: '',
      name: '',
      preparationTime: {
        hours: 0,
        minutes: 0
      },
      cookingTime: {
        hours: 0,
        minutes: 0
      },
      description: '',
      createdCookingRecipe: '',
      ingredients: [],
      devices: [],
      category: {
        id: '',
        name: ''
      },
      type: {
        id: '',
        name: ''
      },
      member: {
        id: '',
        pseudo: '',
        email: '',
        name: '',
        surname: ''
      }
    };
    this.currentIndex = -1;
  }


  setActiveCookingRecipe(cookingRecipe: CookingRecipeResponse, index: number): void {
    this.currentCookingRecipe = cookingRecipe;
    this.currentIndex = index;
  }

  updateFilter() {
    this.filteredCookingRecipes = this.cookingRecipes!.filter(
      ( value: { name: string; }) => value.name.toLowerCase().includes(this.filter.toLowerCase()
      ));
  }

  // searchTitle(): void {
  //   this.currentCookingRecipe = {};
  //   this.currentIndex = -1;
  //   this.cookingRecipeService.(this.title)
  //     .subscribe({
  //       next: (data) => {
  //         this.tutorials = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

}
