import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSidebarComponent } from './single-sidebar.component';

describe('SingleSidebarComponent', () => {
  let component: SingleSidebarComponent;
  let fixture: ComponentFixture<SingleSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
