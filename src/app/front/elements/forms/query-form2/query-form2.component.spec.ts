import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForm2Component } from './query-form2.component';

describe('QueryForm2Component', () => {
  let component: QueryForm2Component;
  let fixture: ComponentFixture<QueryForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryForm2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
