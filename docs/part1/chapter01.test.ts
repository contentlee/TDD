import { describe, expect, test } from "@jest/globals";
import { Dollar } from "./chapter01";

// Chapter 1
describe("testMultiplication", () => {
  test("testMultiplication", () => {
    const five = new Dollar(5);
    five.times(2);
    expect(five.amount).toBe(10);
  });
});
