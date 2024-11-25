import { expect } from 'chai';
import capitalize from '../src/capitalize.js';

describe('capitalize.js', () => {
  describe('positive tests', () => {
    it('should capitalize first letter of lowercase string', () => {
      const result = capitalize('fred');
      expect(result).to.equal('Fred');
    });

    it('should convert rest of string to lowercase', () => {
      const result = capitalize('FRED');
      expect(result).to.equal('Fred');
    });

    it('should handle single character strings', () => {
      const result = capitalize('a');
      expect(result).to.equal('A');
    });

    it('should handle mixed case strings', () => {
      const result = capitalize('fReDdIe');
      expect(result).to.equal('Freddie');
    });

    it('should handle string with numbers', () => {
      const result = capitalize('fred123');
      expect(result).to.equal('Fred123');
    });

    it('should handle string with special characters', () => {
      const result = capitalize('fred!@#');
      expect(result).to.equal('Fred!@#');
    });

    it('should handle string with leading spaces', () => {
      const result = capitalize('  fred');
      expect(result).to.equal('  fred');
    });
  });

  describe('negative tests', () => {
    it('should handle empty string', () => {
      const result = capitalize('');
      expect(result).to.equal('');
    });

    it('should handle null input', () => {
      const result = capitalize(null);
      expect(result).to.equal('');
    });

    it('should handle undefined input', () => {
      const result = capitalize(undefined);
      expect(result).to.equal('');
    });

    it('should handle number input', () => {
      const result = capitalize(123);
      expect(result).to.equal('123');
    });

    it('should handle boolean input', () => {
      const result = capitalize(true);
      expect(result).to.equal('True');
    });

    it('should handle string with only special characters', () => {
      const result = capitalize('!@#$%');
      expect(result).to.equal('!@#$%');
    });

    it('should handle string with only numbers', () => {
      const result = capitalize('12345');
      expect(result).to.equal('12345');
    });
  });
});