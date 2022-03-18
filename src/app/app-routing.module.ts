import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { AddCookingRecipeComponent } from './cooking-recipe/add-cooking-recipe/add-cooking-recipe.component';
import { DetailsCookingRecipeComponent } from './cooking-recipe/details-cooking-recipe/details-cooking-recipe.component';
import { ListCookingRecipeComponent } from './cooking-recipe/list-cooking-recipe/list-cooking-recipe.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: "",component: HomeComponent},
  { path:"home", component:HomeComponent},
  { path:"catalogue", component: CatalogueComponent},
  { path: 'mes-recettes', component: ListCookingRecipeComponent },
  { path: 'mes-recettes/ma-recette-detail/:id', component: DetailsCookingRecipeComponent },
  { path: 'mes-recettes/add', component: AddCookingRecipeComponent },
  
  { path:'**', redirectTo:"home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
