import { expect } from 'chai';
import filter from '../src/filter.js';

describe('filter.js', () => {
  describe('positive tests', () => {
    it('should filter elements based on the provided predicate', () => {
      const users = [
        { user: 'barney', active: true },
        { user: 'fred', active: false },
      ];

      const result = filter(users, (value) => value.active);

      expect(result).to.deep.equal([{ user: 'barney', active: true }]);
    });

    it('should filter elements based on a custom predicate', () => {
      const numbers = [1, 2, 3, 4, 5];

      const result = filter(numbers, (value) => value % 2 === 0);

      expect(result).to.deep.equal([2, 4]);
    });

    it('should filter elements based on truthiness', () => {
      const mixedValues = [0, 'one', false, true, null];

      const result = filter(mixedValues, (value) => value);

      expect(result).to.deep.equal(['one', true]);
    });
  });
  //Note that these tests fail and it's OK. There is a bug in the implementation
  describe('negative tests', () => {
    it('should return an empty array if no numbers match the predicate', () => {
      const numbers = [1, 2, 3, 4, 5];

      const result = filter(numbers, (value) => value > 5);

      expect(result).to.deep.equal([]);
    });
    it('should return an empty array if the array is empty', () => {
      const numbers = [];

      const result = filter(numbers, (value) => value > 5);

      expect(result).to.deep.equal([]);
    });
    it('should return an empty array if no strings match the predicate', () => {
      const strings = ['Finland', 'Sweden', 'Norway'];

      const result = filter(strings, (value) => value.length > 10);

      expect(result).to.deep.equal([]);
    });

    it('should return an empty array if the array contains only empty strings', () => {
      const strings = ['', ''];

      const result = filter(strings, (value) => value.length > 0);

      expect(result).to.deep.equal([]);
    });

    it('should return an empty array if the predicate always returns false', () => {
      const strings = ['Finland', 'Sweden', 'Norway'];

      const result = filter(strings, () => false);

      expect(result).to.deep.equal([]);
    });
  });
});
