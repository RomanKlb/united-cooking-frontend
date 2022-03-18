import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }

  recoveryIngredients$(): Observable<any> {
    var uri = "unitedcooking/ingredient/all";
    return this.http.get<any>(uri, httpOptions);
  }
}
