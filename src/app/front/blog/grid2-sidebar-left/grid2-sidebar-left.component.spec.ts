import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grid2SidebarLeftComponent } from './grid2-sidebar-left.component';

describe('Grid2SidebarLeftComponent', () => {
  let component: Grid2SidebarLeftComponent;
  let fixture: ComponentFixture<Grid2SidebarLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Grid2SidebarLeftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Grid2SidebarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
