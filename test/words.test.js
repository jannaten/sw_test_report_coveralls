import { expect } from 'chai';
import words from '../src/words.js';

describe('words.js', () => {
    describe('positive tests', () => {
        it('should split basic string into words', () => {
            const result = words('fred, barney, & pebbles');
            expect(result).to.deep.equal(['fred', 'barney', 'pebbles']);
        });

        it('should handle custom pattern', () => {
            const result = words('fred, barney, & pebbles', /[^, ]+/g);
            expect(result).to.deep.equal(['fred', 'barney', '&', 'pebbles']);
        });

        it('should handle camelCase words', () => {
            const result = words('camelCase');
            expect(result).to.deep.equal(['camel', 'Case']);
        });

        it('should handle PascalCase words', () => {
            const result = words('PascalCase');
            expect(result).to.deep.equal(['Pascal', 'Case']);
        });

        it('should handle string with numbers', () => {
            const result = words('hello123world');
            expect(result).to.deep.equal(['hello', '123', 'world']);
        });

        it('should handle string with special characters', () => {
            const result = words('hello!world');
            expect(result).to.deep.equal(['hello', 'world']);
        });

        it('should handle compound words', () => {
            const result = words('test-case');
            expect(result).to.deep.equal(['test', 'case']);
        });

        it('should handle multiple uppercase letters', () => {
            const result = words('HTMLInput');
            expect(result).to.deep.equal(['HTML', 'Input']);
        });
    });

    describe('negative tests', () => {
        it('should return empty array for empty string', () => {
            const result = words('');
            expect(result).to.deep.equal([]);
        });

        it('should return empty array for null', () => {
            const result = words(null);
            expect(result).to.deep.equal([]);
        });

        it('should return empty array for undefined', () => {
            const result = words(undefined);
            expect(result).to.deep.equal([]);
        });

        it('should handle string with only spaces', () => {
            const result = words('   ');
            expect(result).to.deep.equal([]);
        });

        it('should handle string with only special characters', () => {
            const result = words('!@#$%^&*');
            expect(result).to.deep.equal([]);
        });

        it('should handle string with only numbers', () => {
            const result = words('12345');
            expect(result).to.deep.equal(['12345']);
        });

        it('should handle invalid regex pattern', () => {
            const result = words('test string', /./g);  // Valid regex
            expect(result).to.deep.equal([]);
        });
    });
});