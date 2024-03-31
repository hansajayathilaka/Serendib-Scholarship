import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetEmailSendStatusComponent } from './reset-email-send-status.component';

describe('ResetEmailSendStatusComponent', () => {
  let component: ResetEmailSendStatusComponent;
  let fixture: ComponentFixture<ResetEmailSendStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetEmailSendStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetEmailSendStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
