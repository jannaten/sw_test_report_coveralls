import { expect } from 'chai';
import toString from '../src/toString.js';

describe('toString.js', () => {
    describe('positive tests', () => {
        it('should return the same string for string input', () => {
            expect(toString('hello')).to.equal('hello');
        });

        it('should convert array to comma-separated string', () => {
            expect(toString([1, 2, 3])).to.equal('1,2,3');
        });

        it('should handle nested arrays', () => {
            expect(toString([1, [2, 3], 4])).to.equal('1,2,3,4');
        });

        it('should convert numbers to strings', () => {
            expect(toString(123)).to.equal('123');
            expect(toString(-123)).to.equal('-123');
            expect(toString(0)).to.equal('0');
        });

        it('should preserve negative zero', () => {
            expect(toString(-0)).to.equal('-0');
        });

        it('should convert boolean values to strings', () => {
            expect(toString(true)).to.equal('true');
            expect(toString(false)).to.equal('false');
        });

        it('should convert symbols to strings', () => {
            const sym = Symbol('test');
            expect(toString(sym)).to.equal('Symbol(test)');
        });

        it('should convert objects to string representation', () => {
            const obj = { toString: () => 'custom object' };
            expect(toString(obj)).to.equal('custom object');
        });
    });

    describe('negative tests', () => {
        it('should return empty string for null', () => {
            expect(toString(null)).to.equal('');
        });

        it('should return empty string for undefined', () => {
            expect(toString(undefined)).to.equal('');
        });

        it('should handle array with null and undefined values', () => {
            expect(toString([1, null, 3, undefined])).to.equal('1,,3,');
        });

        it('should handle empty array', () => {
            expect(toString([])).to.equal('');
        });

        it('should handle array with empty values', () => {
            expect(toString([, , ,])).to.equal(',,'); // eslint-disable-line no-sparse-arrays
        });

        it('should handle NaN', () => {
            expect(toString(NaN)).to.equal('NaN');
        });

        it('should handle Infinity and -Infinity', () => {
            expect(toString(Infinity)).to.equal('Infinity');
            expect(toString(-Infinity)).to.equal('-Infinity');
        });

        it('should handle very large numbers', () => {
            const largeNumber = Number.MAX_SAFE_INTEGER + 1;
            expect(toString(largeNumber)).to.equal(largeNumber.toString());
        });

        it('should handle very small numbers', () => {
            const smallNumber = Number.MIN_SAFE_INTEGER - 1;
            expect(toString(smallNumber)).to.equal(smallNumber.toString());
        });

        it('should handle array with mixed types', () => {
            const mixedArray = [1, 'two', true, null, undefined, Symbol('test')];
            expect(toString(mixedArray)).to.equal('1,two,true,,,Symbol(test)');
        });
    });

    describe('edge cases', () => {
        it('should handle deeply nested arrays', () => {
            const deepArray = [1, [2, [3, [4]]]];
            expect(toString(deepArray)).to.equal('1,2,3,4');
        });

        it('should handle array with special number values', () => {
            expect(toString([NaN, Infinity, -Infinity, -0])).to.equal('NaN,Infinity,-Infinity,-0');
        });

        it('should handle array with empty strings', () => {
            expect(toString(['', '', ''])).to.equal(',,');
        });

        it('should handle object with custom toString method', () => {
            const customObj = {
                toString: () => 'custom'
            };
            expect(toString([customObj])).to.equal('custom');
        });
    });
});