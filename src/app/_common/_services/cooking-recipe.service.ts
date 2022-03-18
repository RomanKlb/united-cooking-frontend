import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookingRecipeRequest } from '../_models/cookingRecipe/cooking-recipe-request';
import { TokenStorageService } from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CookingRecipeService {

  constructor(private http: HttpClient,
    private tokenStorageService: TokenStorageService) { }

    addCookingRecipe$(cookingRecipeReceipt: CookingRecipeRequest): Observable<any> {
      var uri = "unitedcooking/cooking-recipe/save";
      return this.http.post<any>(uri, cookingRecipeReceipt, httpOptions);
    }

    recoveryOneCookingRecipe$(id: string): Observable<any> {
      var uri = "unitedcooking/cooking-recipe/" + id;
      return this.http.get<any>(uri, httpOptions);
    }
    
    recoveryAllCookingRecipesForAdmin$(): Observable<any> {
      var uri = "unitedcooking/cooking-recipe/admin/all";
      return this.http.get<any>(uri, httpOptions);
    }
     
    recoveryAllCookingRecipesModerateByAdmin$(): Observable<any> {
      var uri = "unitedcooking/cooking-recipe/all";
      return this.http.get<any>(uri, httpOptions);
    }
    
    deleteOneCookingRecipe$(id: Number): Observable<any> {
      var uri = "unitedcooking/cooking-recipe/"+ id +"/delete";
      return this.http.delete<any>(uri, httpOptions);
    }
     
}
