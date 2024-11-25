import { expect } from 'chai';
import isArrayLike from '../src/isArrayLike.js';

describe('isArrayLike.js', () => {
    describe('positive tests', () => {
        it('should return true for arrays', () => {
            expect(isArrayLike([1, 2, 3])).to.be.true;
        });

        it('should return true for strings', () => {
            expect(isArrayLike('abc')).to.be.true;
        });

        it('should return true for array-like objects with length property', () => {
            const arrayLikeObj = { length: 3, 0: 'a', 1: 'b', 2: 'c' };
            expect(isArrayLike(arrayLikeObj)).to.be.true;
        });

        it('should return true for empty array', () => {
            expect(isArrayLike([])).to.be.true;
        });

        it('should return true for empty string', () => {
            expect(isArrayLike('')).to.be.true;
        });

        it('should return true for array-like object with zero length', () => {
            const arrayLikeObj = { length: 0 };
            expect(isArrayLike(arrayLikeObj)).to.be.true;
        });

        it('should return true for array-like object with MAX_SAFE_INTEGER length', () => {
            const arrayLikeObj = { length: Number.MAX_SAFE_INTEGER };
            expect(isArrayLike(arrayLikeObj)).to.be.true;
        });
    });

    describe('negative tests', () => {
        it('should return false for functions', () => {
            expect(isArrayLike(Function)).to.be.false;
            expect(isArrayLike(() => {})).to.be.false;
        });

        it('should return false for null', () => {
            expect(isArrayLike(null)).to.be.false;
        });

        it('should return false for undefined', () => {
            expect(isArrayLike(undefined)).to.be.false;
        });

        it('should return false for numbers', () => {
            expect(isArrayLike(123)).to.be.false;
        });

        it('should return false for boolean values', () => {
            expect(isArrayLike(true)).to.be.false;
            expect(isArrayLike(false)).to.be.false;
        });

        it('should return false for objects without length property', () => {
            expect(isArrayLike({})).to.be.false;
            expect(isArrayLike({ a: 1, b: 2 })).to.be.false;
        });

        it('should return false for objects with invalid length values', () => {
            expect(isArrayLike({ length: -1 })).to.be.false;
            expect(isArrayLike({ length: Number.MAX_SAFE_INTEGER + 1 })).to.be.false;
            expect(isArrayLike({ length: 'abc' })).to.be.false;
            expect(isArrayLike({ length: 3.5 })).to.be.false;
        });

        it('should return false for objects with symbolic length property', () => {
            const sym = Symbol('length');
            expect(isArrayLike({ [sym]: 3 })).to.be.false;
        });
    });
});