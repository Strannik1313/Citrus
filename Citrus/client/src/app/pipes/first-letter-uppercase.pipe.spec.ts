import { FirstLetterUppercasePipe } from '@pipes/first-letter-uppercase.pipe';

describe('First-letter-uppercase pipe', () => {
	const pipe = new FirstLetterUppercasePipe();

	describe('Transform', () => {
		it('transforms "mock mock" to "Mock mock"', () => {
			expect(pipe.transform('mock mock')).toBe('Mock mock');
		});

		it('should not return any value if input value is undefined', () => {
			expect(pipe.transform(undefined)).not.toBeTruthy();
		});
	});
});
