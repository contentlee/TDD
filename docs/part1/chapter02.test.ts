import { describe, test, expect } from "@jest/globals";
import { Dollar } from "./chapter02";

describe("testMultiplication", () => {
  test("testMultiplication", () => {
    const five = new Dollar(5);
    let product: Dollar;

    product = five.times(2);
    expect(product.amount).toBe(10);

    product = five.times(3);
    expect(product.amount).toBe(15);
  });
});
