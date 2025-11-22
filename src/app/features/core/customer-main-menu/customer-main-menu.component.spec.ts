import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMainMenuComponent } from './customer-main-menu.component';

describe('CustomerMainMenuComponent', () => {
  let component: CustomerMainMenuComponent;
  let fixture: ComponentFixture<CustomerMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMainMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
