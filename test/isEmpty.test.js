import { expect } from "chai";
import isEmpty from "../src/isEmpty.js";

describe("isEmpty.js", () => {
    describe("positive tests", () => {
        it("should be empty for empty object", () => {
            expect(isEmpty({})).to.be.true;
        });
        it("should be empty for empty array",() => {
            expect(isEmpty([])).to.be.true;
        });
        it("should be empty for empty string",() => {
            expect(isEmpty("")).to.be.true;
        });
        it("should be empty for null",() => {
            expect(isEmpty(null)).to.be.true;
        });
        it("should be empty for undefined",() => {
            expect(isEmpty(undefined)).to.be.true;
        });
        it("should be empty for number", () => {
            expect(isEmpty(0)).to.be.true;
        })
        it("should be empty for boolean", () => {
            expect(isEmpty(false)).to.be.true;
        });
        it("should not be empty for map", () => {
            expect(isEmpty(new Map([["key", "value"]]))).to.be.false;
        })
    });
    describe("negative tests", () => {
        it("should not be empty for object with properties",() => {
            expect(isEmpty({name: "Tester", age: 99})).to.be.false;
        });
        it("should not be empty for array with elements",() => {
            expect(isEmpty([0, -1, -2])).to.be.false;
        });
        it("should not be empty for string with characters",() => {
            expect(isEmpty("Hello, World!")).to.be.false;
        });
        it("should not be empty for array with 0 inside it", () =>{
            expect(isEmpty([0])).to.be.false;
        })
        it("should be empty for empty map", () => {
            expect(isEmpty(new Map())).to.be.true;
        });
        it('should not be empty for object with inherited properties', () => {
            function Parent() {
                this.inheritedProp = 'value';
            }
            const child = new Parent();
            expect(isEmpty(child)).to.be.false;
        });
        it('should not be empty for array-like object with length property', () => {
            const arrayLike = { length: 0, 0: 'a' };
            expect(isEmpty(arrayLike)).to.be.false;
        });
    });
});