import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodstockEditComponent } from './bloodstock-edit.component';

describe('BloodstockEditComponent', () => {
  let component: BloodstockEditComponent;
  let fixture: ComponentFixture<BloodstockEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodstockEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodstockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
