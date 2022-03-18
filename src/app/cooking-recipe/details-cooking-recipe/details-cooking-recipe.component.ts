import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookingRecipeResponse } from 'src/app/_common/_models/cookingRecipe/cooking-recipe-response';
import { CookingRecipeService } from 'src/app/_common/_services/_cooking-recipe/cooking-recipe.service';

@Component({
  selector: 'app-details-cooking-recipe',
  templateUrl: './details-cooking-recipe.component.html',
  styleUrls: ['./details-cooking-recipe.component.css']
})
export class DetailsCookingRecipeComponent implements OnInit {

  @Input() 
  viewMode = false;

  @Input() 
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

  message = '';

  constructor(
    private cookingRecipeService: CookingRecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getTutorial(this.route.snapshot.params["id"]);
    }
  }
  getTutorial(id: string): void {
    this.cookingRecipeService.recoveryOneCookingRecipe$(id)
      .subscribe({
        next: (data) => {
          this.currentCookingRecipe = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  // updatePublished(status: boolean): void {
  //   const data = {
  //     title: this.currentTutorial.title,
  //     description: this.currentTutorial.description,
  //     published: status
  //   };
  //   this.message = '';
  //   this.tutorialService.update(this.currentTutorial.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentTutorial.published = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  // updateTutorial(): void {
  //   this.message = '';
  //   this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.message = res.message ? res.message : 'This tutorial was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
  // deleteTutorial(): void {
  //   this.tutorialService.delete(this.currentTutorial.id)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.router.navigate(['/tutorials']);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}

