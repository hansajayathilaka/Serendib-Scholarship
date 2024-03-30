import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordEmailComponent } from './forget-password-email.component';

describe('ForgetPasswordEmailComponent', () => {
  let component: ForgetPasswordEmailComponent;
  let fixture: ComponentFixture<ForgetPasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPasswordEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
