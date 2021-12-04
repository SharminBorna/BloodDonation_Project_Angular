import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupEditComponent } from './bloodgroup-edit.component';

describe('BloodgroupEditComponent', () => {
  let component: BloodgroupEditComponent;
  let fixture: ComponentFixture<BloodgroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodgroupEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodgroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
