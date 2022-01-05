import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDateOrdersComponent } from './view-date-orders.component';

describe('ViewDateOrdersComponent', () => {
  let component: ViewDateOrdersComponent;
  let fixture: ComponentFixture<ViewDateOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDateOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDateOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
