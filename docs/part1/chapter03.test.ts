import { test, expect, describe } from "@jest/globals";
import { Dollar } from "./chapter3";

describe("test", () => {
  test("testMultiplication", () => {
    const five = new Dollar(5);
    five.times(2);
    expect(five.amount).toBe(10);
  });

  test("testEquality", () => {
    // 동치성(equality)
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  });
});
