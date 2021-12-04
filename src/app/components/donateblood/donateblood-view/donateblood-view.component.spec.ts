import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatebloodViewComponent } from './donateblood-view.component';

describe('DonatebloodViewComponent', () => {
  let component: DonatebloodViewComponent;
  let fixture: ComponentFixture<DonatebloodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonatebloodViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonatebloodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
