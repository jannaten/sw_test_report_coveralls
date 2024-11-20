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
        it('should concatenate the array elements', () => {
            const strings = ['a', 'b', 'c'];

            const result = reduce(strings, (concatenated, s) => concatenated + s, '');

            expect(result).to.equal('abc');
        });
        it("Should create arrays of the same values", () => {
            const objects = { 'Finland' : 3 , 'Sweden' : 1 , 'Norway' : 5, 'Denmark' : 3 };

            const results = reduce(objects, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {});

            expect(results).to.eql({ '1': ['Sweden'], '3': ['Finland', 'Denmark'], '5': ['Norway'] });
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
        it('should handle strings with zero instances', () => {
            const objects = { 'Finland' : 1 , 'Sweden' : 0 , 'Norway' : 0, 'Denmark' : 0 };

            const results = reduce(objects, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {});

            expect(results).to.eql({ '1': ['Finland'], '0': ['Sweden', 'Norway', 'Denmark'] });
        });
        it('should handle strings with negative instances', () => {
            const objects = { 'Finland' : 1 , 'Sweden' : -1 , 'Norway' : 1, 'Denmark' : -1 };

            const results = reduce(objects, (result, value, key) => {
                (result[value] || (result[value] = [])).push(key);
                return result;
            }, {});

            expect(results).to.eql({ '1': ['Finland', 'Norway'], '-1': ['Sweden', 'Denmark'] });
        });
        it('should handle empty strings', () => {
            const strings = ['', '', ''];

            const result = reduce(strings, (concatenated, s) => concatenated + s, '');

            expect(result).to.equal('');
        });
    });
});
