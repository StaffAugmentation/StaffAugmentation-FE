import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestDegreeComponent } from './highest-degree.component';

describe('HighestDegreeComponent', () => {
  let component: HighestDegreeComponent;
  let fixture: ComponentFixture<HighestDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestDegreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighestDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
