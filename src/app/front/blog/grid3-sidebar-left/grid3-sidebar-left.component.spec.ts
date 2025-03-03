import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid3SidebarLeftComponent } from './grid3-sidebar-left.component';

describe('Grid3SidebarLeftComponent', () => {
  let component: Grid3SidebarLeftComponent;
  let fixture: ComponentFixture<Grid3SidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grid3SidebarLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Grid3SidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
