import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodrequestViewComponent } from './bloodrequest-view.component';

describe('BloodrequestViewComponent', () => {
  let component: BloodrequestViewComponent;
  let fixture: ComponentFixture<BloodrequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodrequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodrequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
