import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSponsorComponent } from './add-edit-sponsor.component';

describe('AddEditSponsorComponent', () => {
  let component: AddEditSponsorComponent;
  let fixture: ComponentFixture<AddEditSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
