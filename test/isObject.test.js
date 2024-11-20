import { expect } from "chai";
import isObject from "../src/isObject.js";

describe("isObject.js", () => {
    describe("positive tests", () => {
        it("should return true for objects", () => {
            const object = {name: "Tester", age: 99};
            expect(isObject(object)).to.be.true;
        });
        it("should return true for arrays", () => {
            expect(isObject([1, 2, 3])).to.be.true;
        });
        it("should return true for functions", () => {
            expect(isObject(Function)).to.be.true;
        });
    });
    describe("negative tests", () => {
        it("should return false for null", () => {
            expect(isObject(null)).to.be.false;
        });
        it("should return false for undefined", () => {
            expect(isObject(undefined)).to.be.false;
        });
        it("should return false for numbers", () => {
            expect(isObject(42)).to.be.false;
        });
        it("should return false for strings", () => {
            expect(isObject("Hello, World!")).to.be.false;
        });
        it("should return false for booleans", () => {
            expect(isObject(true)).to.be.false;
        });
    });
});