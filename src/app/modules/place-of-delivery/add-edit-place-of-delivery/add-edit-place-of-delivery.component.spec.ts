import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPlaceOfDeliveryComponent } from './add-edit-place-of-delivery.component';

describe('AddEditPlaceOfDeliveryComponent', () => {
  let component: AddEditPlaceOfDeliveryComponent;
  let fixture: ComponentFixture<AddEditPlaceOfDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPlaceOfDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPlaceOfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
