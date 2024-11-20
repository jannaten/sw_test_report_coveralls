import { expect } from 'chai';
import toNumber from '../src/toNumber.js';

describe('toNumber.js', () => {
  describe('positive tests', () => {
    it('should return same number, if number is already number', () => {
      const number = 5.4;

      const result = toNumber(number);

      expect(result).to.equal(5.4);
    });
    it('should return NaN if value is symbol', () => {
      const symbol = Symbol('not a number');

      const result = toNumber(symbol);

      expect(result).to.be.NaN;
    });
    it('should return max int', () => {
      const maxInt = Number.MAX_VALUE;

      const result = toNumber(maxInt);

      expect(result).to.equal(Number.MAX_VALUE);
    });
    it('should return Infinity', () => {
      const infinity = Infinity;

      const result = toNumber(infinity);

      expect(result).to.equal(Infinity);
    });
    it('should return number from string', () => {
      const string = '1124.56';

      const result = toNumber(string);

      expect(result).to.equal(1124.56);
    });
    it('should return number from binary string', () => {
      const binary = '0b11000';

      const result = toNumber(binary);

      expect(result).to.equal(24);
    });
    it('should return number from octal string', () => {
      const octal = '0o30';

      const result = toNumber(octal);

      expect(result).to.equal(24);
    });
    it('should return value from object', () => {
        const object = { valueOf: () => 123 };
    
        const result = toNumber(object);
    
        expect(result).to.equal(123);
    });
  });
  describe('negative tests', () => {
    it('should return 0 if value is 0', () => {
      const zero = 0;

      const result = toNumber(zero);

      expect(result).to.equal(0);
    });
    it('should return number from string with leading and trailing whitespace', () => {
      const string = '  123  ';

      const result = toNumber(string);

      expect(result).to.equal(123);
    });
    it('should handle negative numbers', () => {
        const negative = '-123';
    
        const result = toNumber(negative);
    
        expect(result).to.equal(-123);
    });
    it('should handle empty strings', () => {
        const empty = '';
    
        const result = toNumber(empty);
    
        expect(result).to.equal(0);
    });
    it('should handle null', () => {
        const nullValue = null;
    
        const result = toNumber(nullValue);
    
        expect(result).to.equal(0);
    });
    it('should handle faulty hex', () => {
        const hex = '-0x123';
    
        const result = toNumber(hex);
    
        expect(result).to.be.NaN;
    });
    it('should handle faulty octal', () => {
        const octal = '-0o000001';
    
        const result = toNumber(octal);
    
        expect(result).to.be.NaN;
    });
    it('should return NaN if it\'s object without valueOf', () => {
        const object = { value: 123 };
    
        const result = toNumber(object);
    
        expect(result).to.be.NaN;
    });

  });
});
