import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodrequestCreateComponent } from './bloodrequest-create.component';

describe('BloodrequestCreateComponent', () => {
  let component: BloodrequestCreateComponent;
  let fixture: ComponentFixture<BloodrequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodrequestCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodrequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
