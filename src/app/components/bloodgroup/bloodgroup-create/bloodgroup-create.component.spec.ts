import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodgroupCreateComponent } from './bloodgroup-create.component';

describe('BloodgroupCreateComponent', () => {
  let component: BloodgroupCreateComponent;
  let fixture: ComponentFixture<BloodgroupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodgroupCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodgroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
