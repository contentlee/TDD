import { describe, it, expect } from "@jest/globals";
import { Money } from "./chapter11";

describe("test", () => {
  it("test currency", () => {
    expect(Money.dollar(1).getCurrency()).toBe("USD");
    expect(Money.franc(1).getCurrency()).toBe("CHF");
  });

  // 해당 테스트의 의미가 없어짐에 따라 지울지에 대한 판단이 필요하다.
  // 해당 테스트는 여러 클래스가 존재할 때만 의미가 있는 테스트이며,
  // 현재 Franc 클래스를 제거하려는 작업 중이기에 필요한 테스트가 아니다.
  // it("test differnet class equality", () => {
  //   expect(new Money(10, "CHF").equals(new Franc(10, "CHF"))).toBeTruthy();
  // });

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
});
