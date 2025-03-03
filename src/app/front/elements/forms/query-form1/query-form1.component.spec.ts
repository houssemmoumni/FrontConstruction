import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForm1Component } from './query-form1.component';

describe('QueryForm1Component', () => {
  let component: QueryForm1Component;
  let fixture: ComponentFixture<QueryForm1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryForm1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
