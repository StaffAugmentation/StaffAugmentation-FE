import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHighestDegreeComponent } from './add-edit-highest-degree.component';

describe('AddEditHighestDegreeComponent', () => {
  let component: AddEditHighestDegreeComponent;
  let fixture: ComponentFixture<AddEditHighestDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditHighestDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditHighestDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
