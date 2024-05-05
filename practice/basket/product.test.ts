import { describe, expect, it } from "@jest/globals";

import Product, { TProduct } from "./product";

import data from "./mock.json";

const init = (data: TProduct) => {
  return new Product(data);
};

describe("product test", () => {
  it("calculate price", () => {
    const product1 = init(data[0]);
    expect(product1._calPrice()).toBe(1764);
    const product2 = init(data[1]);
    expect(product2._calPrice()).toBe(9030);
    const product3 = init(data[3]);
    expect(product3._calPrice()).toBe(159000);
  });
});
