import { describe, expect, it } from "@jest/globals";
import ShoppingBasket from "./basket";

import data from "./mock.json";
import coupons from "./coupon.json";

const init = () => {
  return new ShoppingBasket();
};

describe("basket test", () => {
  it("add product test", () => {
    const basket = init();
    expect(basket.basket.length).toBe(0);

    basket.add(data[0]);
    expect(basket.basket.length).toBe(1);
  });

  it("plus product test", () => {
    const basket = init();
    basket.add(data[0]);
    const id = basket.basket[0].id;

    basket.plus(id);
    expect(basket.basket[0].count).toBe(2);
    basket.plus(id);
    expect(basket.basket[0].count).toBe(3);
  });

  it("remove product test", () => {
    const basket = init();
    basket.add(data[0]);
    const id = basket.basket[0].id;

    expect(basket.basket.length).toBe(1);
    basket.remove(id);
    expect(basket.basket.length).toBe(0);
  });

  it("minus product test", () => {
    const basket = init();
    basket.add(data[0]);
    const id = basket.basket[0].id;

    basket.plus(id).plus(id).plus(id).minus(id);
    expect(basket.basket[0].count).toBe(3);
    basket.minus(id).minus(id).minus(id).minus(id);
    expect(basket.basket.length).toBe(0);
  });

  it("sum all test", () => {
    const basket = init();
    basket.add(data[0]);
    const id0 = basket.basket[0].id;
    basket.plus(id0).plus(id0);

    basket.add(data[1]);
    const id1 = basket.basket[1].id;
    basket.plus(id1);

    basket.add(data[3]);

    expect(basket.sum()).toBe(basket.totalPrice);
    expect(basket.sum()).toBe(182352);
  });

  it("apply && reset coupon test", () => {
    const basket = init();
    basket.add(data[0]);
    basket.add(data[1]);
    basket.add(data[3]);

    basket.applyCoupon(coupons[0]);
    expect(basket.expectedPrice).toBe(152815);
    basket.applyCoupon(coupons[1]);
    expect(basket.expectedPrice).toBe(152815);

    basket.resetCoupon();
    basket.applyCoupon(coupons[2]);
    expect(basket.expectedPrice).toBe(153894);
  });
});
