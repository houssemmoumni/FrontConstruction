import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceTable1Component } from './price-table1.component';

describe('PriceTable1Component', () => {
  let component: PriceTable1Component;
  let fixture: ComponentFixture<PriceTable1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceTable1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceTable1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
