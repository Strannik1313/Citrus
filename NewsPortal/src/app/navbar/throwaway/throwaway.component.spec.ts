import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThrowawayComponent } from './throwaway.component';

describe('ThrowawayComponent', () => {
  let component: ThrowawayComponent;
  let fixture: ComponentFixture<ThrowawayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThrowawayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThrowawayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
