import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatebloodEditComponent } from './donateblood-edit.component';

describe('DonatebloodEditComponent', () => {
  let component: DonatebloodEditComponent;
  let fixture: ComponentFixture<DonatebloodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatebloodEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatebloodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
