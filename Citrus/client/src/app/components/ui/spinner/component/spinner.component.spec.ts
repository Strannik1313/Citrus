import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from './spinner.component';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SpinnerComponent],
			imports: [MatProgressSpinnerModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	afterEach(() => {
		fixture.destroy();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change spinner diameter', () => {
		component.diameter = 20;
		fixture.detectChanges();
		let spinnerEl = fixture.debugElement.query(By.css('mat-spinner'));
		expect(spinnerEl.nativeElement.offsetHeight).toEqual(20);
	});
});
