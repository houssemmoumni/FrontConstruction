import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryForm3Component } from './query-form3.component';

describe('QueryForm3Component', () => {
  let component: QueryForm3Component;
  let fixture: ComponentFixture<QueryForm3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryForm3Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
