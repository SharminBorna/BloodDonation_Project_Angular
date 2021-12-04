import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodrequestEditComponent } from './bloodrequest-edit.component';

describe('BloodrequestEditComponent', () => {
  let component: BloodrequestEditComponent;
  let fixture: ComponentFixture<BloodrequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodrequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodrequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
