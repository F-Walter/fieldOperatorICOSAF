import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseAComponent } from './use-case-a.component';

describe('UseCaseAComponent', () => {
  let component: UseCaseAComponent;
  let fixture: ComponentFixture<UseCaseAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseCaseAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
