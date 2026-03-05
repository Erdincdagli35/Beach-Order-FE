import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterProductListComponent } from './waiter-product-list.component';

describe('CustomerProductListComponent', () => {
  let component: WaiterProductListComponent;
  let fixture: ComponentFixture<WaiterProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
