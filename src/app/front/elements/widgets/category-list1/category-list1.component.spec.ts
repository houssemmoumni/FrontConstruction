import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryList1Component } from './category-list1.component';

describe('CategoryList1Component', () => {
  let component: CategoryList1Component;
  let fixture: ComponentFixture<CategoryList1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryList1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
