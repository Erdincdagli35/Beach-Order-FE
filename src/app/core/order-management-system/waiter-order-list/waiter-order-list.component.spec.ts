import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterOrderListComponent } from './waiter-order-list.component';

describe('WaiterOrderListComponent', () => {
  let component: WaiterOrderListComponent;
  let fixture: ComponentFixture<WaiterOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterOrderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
