import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldnewssectionComponent } from './oldnewssection.component';

describe('OldnewssectionComponent', () => {
  let component: OldnewssectionComponent;
  let fixture: ComponentFixture<OldnewssectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldnewssectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldnewssectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
