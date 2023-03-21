import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPTMOwnerComponent } from './add-edit-ptm-owner.component';

describe('AddEditPtmOwnerComponent', () => {
  let component: AddEditPTMOwnerComponent;
  let fixture: ComponentFixture<AddEditPTMOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPTMOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPTMOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
