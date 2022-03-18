import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCookingRecipeComponent } from './list-cooking-recipe.component';

describe('ListCookingRecipeComponent', () => {
  let component: ListCookingRecipeComponent;
  let fixture: ComponentFixture<ListCookingRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCookingRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCookingRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
