import { expect, test } from 'vitest';

import { isNumber, isPercentage } from '~/utils/validation.js';

test('utilities work as expected', () => {
	expect(isNumber('50')).toBe(true);
	expect(isNumber('50%')).toBe(false);
	expect(isPercentage('50%')).toBe(true);
	expect(isPercentage('50')).toBe(false);
});
