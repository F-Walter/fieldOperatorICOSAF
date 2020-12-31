import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationFieldOperatorComponent } from './notification-field-operator.component';

describe('NotificationFieldOperatorComponent', () => {
  let component: NotificationFieldOperatorComponent;
  let fixture: ComponentFixture<NotificationFieldOperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationFieldOperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationFieldOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
