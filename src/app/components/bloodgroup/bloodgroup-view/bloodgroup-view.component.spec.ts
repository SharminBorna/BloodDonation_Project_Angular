import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupViewComponent } from './bloodgroup-view.component';

describe('BloodgroupViewComponent', () => {
  let component: BloodgroupViewComponent;
  let fixture: ComponentFixture<BloodgroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodgroupViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodgroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
