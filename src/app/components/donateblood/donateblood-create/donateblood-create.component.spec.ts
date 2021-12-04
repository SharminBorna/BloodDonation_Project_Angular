import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatebloodCreateComponent } from './donateblood-create.component';

describe('DonatebloodCreateComponent', () => {
  let component: DonatebloodCreateComponent;
  let fixture: ComponentFixture<DonatebloodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatebloodCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatebloodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
