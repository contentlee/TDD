import { describe, it, expect } from "@jest/globals";
import { Dollar, Franc, Money } from "./chapter8";

describe("test", () => {
  it("test multiplication", () => {
    // times의 중복을 없애기 위해 five를 Money로 변경
    const five: Money = Money.dollar(5);
    // 현재 times는 abstract한 상태이기 때문에 테스트는 실패한다.
    expect(new Dollar(10)).toBe(five.times(2));
    expect(new Dollar(15)).toBe(five.times(3));
  });

  it("test equality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
    expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
    expect(new Franc(5).equals(new Franc(6))).toBeFalsy();
    expect(new Franc(5).equals(Money.dollar(5))).toBeFalsy();
  });

  it("test dollar multiplication", () => {
    const five = new Dollar(5);
    expect({ ...new Dollar(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...new Dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test franc multiplication", () => {
    const five = new Franc(5);
    expect({ ...new Franc(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...new Franc(15) }).toMatchObject({ ...five.times(3) });
  });
});
