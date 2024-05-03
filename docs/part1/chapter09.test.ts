import { describe, it, expect } from "@jest/globals";
import { Dollar, Franc, Money } from "./chapter09";

describe("test", () => {
  it("test currency", () => {
    // getCurrency를 통해 통화를 확인할 수 있도록 한다.
    expect(Money.dollar(1).getCurrency()).toBe("USD");
    expect(Money.franc(1).getCurrency()).toBe("CHF");
  });
});
