import { describe, it, expect } from "@jest/globals";
import { Dollar, Franc } from "./chapter6";

describe("test", () => {
  it("test equality", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
    expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
    expect(new Franc(5).equals(new Franc(6))).toBeFalsy();
    // 수정전 : Dollar 와 Franc이 같은 객체로 평가된다.
    expect(new Franc(5).equals(new Dollar(5))).toBeFalsy();
  });
});
