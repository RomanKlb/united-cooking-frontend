import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: "",component: HomeComponent},
  { path:"home", component:HomeComponent},
  { path:"catalogue", component: CatalogueComponent},

  { path:'**', redirectTo:"home", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
