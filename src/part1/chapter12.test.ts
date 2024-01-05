import { describe, it, expect } from "@jest/globals";
import { Bank, Money } from "./chapter12";

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

  // 더하기를 만들기 위해 test 코드를 작성한다.
  it("test simple addition", () => {
    const five = Money.dollar(5);
    const sum = five.plus(five);

    const bank = new Bank();
    const reduced = bank.reduce(sum, "USD");
    // 1. reduced는 Expression에 환율을 적용함으로써 얻어짐.
    expect(Money.dollar(10)).toBe(reduced);
  });
});

// Expression 은 우리가 하려고 하는 일의 핵심에 해당한다.
// 나는 핵심이 되는 객체가 다른 부분에 대해서 될 수 있는 한 모르도록 노력한다.
// 그렇게 하면 핵심 객체가 가능한 오랫동안 유연할 수 있다. (p116)
