import { describe, it, expect } from "@jest/globals";
import { Bank, Expression, Money, Sum } from "./chapter13";

describe("test", () => {
  it("test currency", () => {
    expect(Money.dollar(1).getCurrency()).toBe("USD");
    expect(Money.franc(1).getCurrency()).toBe("CHF");
  });

  it("test multiplication", () => {
    const five: Money = Money.dollar(5);
    expect({ ...Money.dollar(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...Money.dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test equality", () => {
    expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy();
    expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy();
    expect(Money.franc(5).equals(Money.dollar(5))).toBeFalsy();
  });

  it("test dollar multiplication", () => {
    const five = Money.dollar(5);
    expect({ ...Money.dollar(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...Money.dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test franc multiplication", () => {
    const five = Money.franc(5);
    expect({ ...Money.franc(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...Money.franc(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test simple addition", () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);

    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    expect(Money.dollar(10)).toMatchObject({ ...reduced });
  });

  // 해당 테스트는 수행하고자 하는 연산의 외부 행위가 아닌 내부 구현에 관여하므로 오래 가는 테스트가 되지 못한다.
  // (augend 는 덧셈의 첫인자를 말하는 피가산수를 뜻한다.)
  it("test plus returns sum", () => {
    const five = Money.dollar(5);
    const result = five.plus(five);
    const sum = result;
    // expect(five).toBe(sum.augend);
    // expect(five).toBe(sum.augend);
  });

  it("test reduce sum", () => {
    const sum = new Sum(Money.dollar(3), Money.dollar(4));
    const bank = new Bank();
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(7)).toMatchObject({ ...result });
  });

  it("test reduce moeny", () => {
    const bank = new Bank();
    const result = bank.reduce(Money.dollar(1), "USD");
    expect(Money.dollar(1)).toMatchObject({ ...result });
  });
});
