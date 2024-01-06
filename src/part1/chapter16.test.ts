import { describe, it, expect } from "@jest/globals";
import { Bank, Expression, Money, Sum } from "./chapter16";

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

  it("test array equals", () => {
    expect(["abc"]).toEqual(expect.arrayContaining(["abc"]));
  });

  it("test identity rate", () => {
    expect(new Bank().rate("USD", "USD")).toBe(1);
  });

  it("test mixed addition", () => {
    const fiveBucks = Money.dollar(5);
    const tenFranc = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const result = bank.reduce(fiveBucks.plus(tenFranc), "USD");
    expect(Money.dollar(10)).toMatchObject({ ...result });
  });

  it("test sum plus money", () => {
    const fiveBucks = Money.dollar(5);
    const tenFranc = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFranc).plus(fiveBucks);
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(15)).toMatchObject({ ...result });
  });

  it("test sum times", () => {
    const fiveBucks = Money.dollar(5);
    const tenFranc = Money.franc(10);
    const bank = new Bank();
    bank.addRate("CHF", "USD", 2);
    const sum = new Sum(fiveBucks, tenFranc).times(2);
    const result = bank.reduce(sum, "USD");
    expect(Money.dollar(20)).toMatchObject({ ...result });
  });

  it("test plus same currency returns money", () => {
    const sum = Money.dollar(1).plus(Money.dollar(1));
    expect(sum instanceof Money).toBeTruthy();
  });
});
