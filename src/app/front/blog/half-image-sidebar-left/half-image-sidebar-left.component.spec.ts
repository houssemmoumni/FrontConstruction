import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HalfImageSidebarLeftComponent } from './half-image-sidebar-left.component';

describe('HalfImageSidebarLeftComponent', () => {
  let component: HalfImageSidebarLeftComponent;
  let fixture: ComponentFixture<HalfImageSidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HalfImageSidebarLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HalfImageSidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
