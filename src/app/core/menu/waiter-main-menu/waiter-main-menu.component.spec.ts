import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterMainMenuComponent } from './waiter-main-menu.component';

describe('WaiterMainMenuComponent', () => {
  let component: WaiterMainMenuComponent;
  let fixture: ComponentFixture<WaiterMainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiterMainMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiterMainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
