import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PTMOwnerComponent } from './ptm-owner.component';

describe('PtmOwnerComponent', () => {
  let component: PTMOwnerComponent;
  let fixture: ComponentFixture<PTMOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PTMOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PTMOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
