import chai from "chai";
import filter from "../src/filter.js";
const expect = chai.expect;

describe("filter.js", () => {
  describe("positive tests", () => {
    it("should filter elements based on the provided predicate", () => {
      const users = [
        { user: "barney", active: true },
        { user: "fred", active: false },
      ];

      const result = filter(users, (value) => value.active);

      expect(result).to.deep.equal([{ user: "barney", active: true }]);
    });

    it("should filter elements based on a custom predicate", () => {
      const numbers = [1, 2, 3, 4, 5];

      const result = filter(numbers, (value) => value % 2 === 0);

      expect(result).to.deep.equal([2, 4]);
    });

    it("should filter elements based on truthiness", () => {
      const mixedValues = [0, "one", false, true, null];

      const result = filter(mixedValues, (value) => value);

      expect(result).to.deep.equal(["one", true]);
    });
  });
});