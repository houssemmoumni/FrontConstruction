import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForm2Component } from './search-form2.component';

describe('SearchForm2Component', () => {
  let component: SearchForm2Component;
  let fixture: ComponentFixture<SearchForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForm2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
