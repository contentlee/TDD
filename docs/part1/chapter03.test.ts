import { test, expect, describe } from "@jest/globals";
import { Dollar } from "./chapter03";

describe("test", () => {
  test("testMultiplication", () => {
    const five = new Dollar(5);

    expect(five.times(2).amount).toBe(10);
  });

  test("testEquality", () => {
    // 동치성(equality)
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  });
});
