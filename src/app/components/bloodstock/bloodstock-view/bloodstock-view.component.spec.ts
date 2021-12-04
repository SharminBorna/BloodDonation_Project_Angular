import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodstockViewComponent } from './bloodstock-view.component';

describe('BloodstockViewComponent', () => {
  let component: BloodstockViewComponent;
  let fixture: ComponentFixture<BloodstockViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodstockViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodstockViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
