import { expect } from 'chai';
import filter from '../src/filter.js';

describe('filter.js', () => {
    describe('positive tests', () => {
        it('should filter array based on predicate', () => {
            const array = [1, 2, 3, 4, 5];
            const result = filter(array, num => num % 2 === 0);
            expect(result).to.deep.equal([2, 4]);
        });

        it('should handle object arrays', () => {
            const users = [
                { user: 'barney', active: true },
                { user: 'fred', active: false }
            ];
            const result = filter(users, ({ active }) => active);
            expect(result).to.deep.equal([{ user: 'barney', active: true }]);
        });

        it('should provide correct index in predicate', () => {
            const indexes = [];
            filter([1, 2, 3], (num, index) => {
                indexes.push(index);
                return false;
            });
            expect(indexes).to.deep.equal([0, 1, 2]);
        });

        it('should provide original array in predicate', () => {
            const array = [1, 2, 3];
            filter(array, (num, index, arr) => {
                expect(arr).to.equal(array);
                return false;
            });
        });

        it('should handle array of strings', () => {
            const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
            const result = filter(words, word => word.length > 6);
            expect(result).to.deep.equal(['exuberant', 'destruction', 'present']);
        });

        it('should handle array of numbers with zero', () => {
            const numbers = [0, 1, 2, 3, 0, 4, 5, 0];
            const result = filter(numbers, num => num === 0);
            expect(result).to.deep.equal([0, 0, 0]);
        });
    });

    describe('negative tests', () => {
        it('should handle null array', () => {
            const result = filter(null, x => x);
            expect(result).to.deep.equal([]);
        });

        it('should handle undefined array', () => {
            const result = filter(undefined, x => x);
            expect(result).to.deep.equal([]);
        });

        it('should handle empty array', () => {
            const result = filter([], x => x);
            expect(result).to.deep.equal([]);
        });

        it('should handle predicate that always returns false', () => {
            const array = [1, 2, 3, 4, 5];
            const result = filter(array, () => false);
            expect(result).to.deep.equal([]);
        });

        it('should handle predicate that always returns true', () => {
            const array = [1, 2, 3];
            const result = filter(array, () => true);
            expect(result).to.deep.equal([1, 2, 3]);
        });

        it('should handle array with undefined and null values', () => {
            const array = [undefined, null, 1, 2, undefined, 3, null];
            const result = filter(array, value => value != null);
            expect(result).to.deep.equal([1, 2, 3]);
        });
    });
});