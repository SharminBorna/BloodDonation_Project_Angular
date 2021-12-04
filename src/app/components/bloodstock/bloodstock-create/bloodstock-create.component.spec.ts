import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodstockCreateComponent } from './bloodstock-create.component';

describe('BloodstockCreateComponent', () => {
  let component: BloodstockCreateComponent;
  let fixture: ComponentFixture<BloodstockCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodstockCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodstockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
