import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveNextOrderDialogComponent } from './move-next-order-dialog.component';

describe('MoveNextOrderDialogComponent', () => {
  let component: MoveNextOrderDialogComponent;
  let fixture: ComponentFixture<MoveNextOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveNextOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveNextOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
