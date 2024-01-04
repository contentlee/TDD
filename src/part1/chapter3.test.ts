import { test, expect } from "@jest/globals";
import { Dollar } from "./chapter3";

test("testEquality", () => {
  // 동치성(equality)
  expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
  expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
});
