import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCookingRecipeComponent } from './add-cooking-recipe.component';

describe('AddCookingRecipeComponent', () => {
  let component: AddCookingRecipeComponent;
  let fixture: ComponentFixture<AddCookingRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCookingRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCookingRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
