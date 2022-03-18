import { TestBed } from '@angular/core/testing';

import { CookingRecipeService } from './cooking-recipe.service';

describe('CookingRecipeService', () => {
  let service: CookingRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
