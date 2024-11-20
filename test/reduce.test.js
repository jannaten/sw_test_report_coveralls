import { expect } from 'chai';
import reduce from '../src/reduce.js';

describe('reduce.js', () => {
    describe('positive tests', () => {
        it('should sum the array elements', () => {
            const numbers = [1, 1, 5, 5];

            const result = reduce(numbers, (sum, n) => sum + n, 0);

            expect(result).to.equal(12);
        });
        it('should multiply the array elements', () => {
            const numbers = [3, 3, 2];

            const result = reduce(numbers, (product, n) => product * n, 1);

            expect(result).to.equal(18);
        });
    });
    describe('negative tests', () => {
        it('should return undefined for empty array', () => {
            const numbers = [];

            const result = reduce(numbers, (sum, n) => sum + n, 0);

            expect(result).to.equal(0);
        });
        it('should handle zeros', () => {
            const numbers = [0, 0, 0, 0];

            const result = reduce(numbers, (sum, n) => sum + n, 0);

            expect(result).to.equal(0);
        });
        it('should handle negative numbers', () => {
            const numbers = [-1, -5, 2];

            const result = reduce(numbers, (sum, n) => sum + n, 0);

            expect(result).to.equal(-4);
        });
    });
});
