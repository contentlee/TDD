import { describe, it, expect } from "@jest/globals";
import { Franc, Money } from "./chapter10";

describe("test", () => {
  it("test currency", () => {
    // getCurrency를 통해 통화를 확인할 수 있도록 한다.
    expect(Money.dollar(1).getCurrency()).toBe("USD");
    expect(Money.franc(1).getCurrency()).toBe("CHF");
  });

  it("test differnet class equality", () => {
    // 다른 통화일 때를 구분하기 위해 기존의 구분 방식을 바꾸기 위해 테스트를 추가한다. (currency 값을 통해 구별)
    expect(new Money(10, "CHF").equals(new Franc(10, "CHF"))).toBeTruthy();
  });
});
