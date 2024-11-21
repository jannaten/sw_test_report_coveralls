import { expect } from "chai";
import get from "../src/get.js";

describe("get.js", () => {
    describe("positive tests", () => {
        it("should return value from array", () => {
            const array = [1, 2, 3];
            expect(get(array, 1)).to.equal(2);
        })
        it("should return value from object", () => {
            const object = {name: "Tester", age: 99};
            expect(get(object, "name")).to.equal("Tester");
        })
        it("should return undefined for non-existing key", () => {
            const object = {name: "Tester", age: 99};
            expect(get(object, "non-existing-key")).to.be.undefined;
        });
        it("should return given default value for non-existing key", () => {
            const object = {name: "Tester", age: 99};
            expect(get(object, "non-existing-key", NaN)).to.be.NaN;
        });
        it("should return value from nested object", () => {
            const object = {name: "Tester", age: 99, address: {street: "Test street", city: "Test city"}};
            expect(get(object, "address.city")).to.equal("Test city");
        });
    });
    describe("negative tests", () => {
        it("should return undefined for null", () => {
            expect(get(null, "name")).to.be.undefined;
        });
        it("should return undefined for undefined", () => {
            expect(get(undefined, "name")).to.be.undefined;
        });
        it("should return null for array out of bounds with null as a defaultValue", () => {
            const array = [1, 2, 3];
            expect(get(array, 3, null)).to.be.null;
        });
    });
});