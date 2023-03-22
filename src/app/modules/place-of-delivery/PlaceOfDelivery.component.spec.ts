import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOfDeliveryComponent } from './PlaceOfDelivery.component';

describe('PlaceOfDeliveryComponent', () => {
  let component: PlaceOfDeliveryComponent;
  let fixture: ComponentFixture<PlaceOfDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceOfDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceOfDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
