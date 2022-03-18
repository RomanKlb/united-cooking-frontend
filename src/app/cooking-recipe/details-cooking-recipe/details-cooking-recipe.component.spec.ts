import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCookingRecipeComponent } from './details-cooking-recipe.component';

describe('DetailsCookingRecipeComponent', () => {
  let component: DetailsCookingRecipeComponent;
  let fixture: ComponentFixture<DetailsCookingRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCookingRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCookingRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
