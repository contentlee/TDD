import Coupon, { TCoupon } from "./coupon";
import Product, { TProduct } from "./product";

interface TBasketItem {
  id: number;
  product_number: string;
  product: Product;
  count: number;
}

class ShoppingBasket {
  basket: TBasketItem[] = [];
  totalPrice: number = 0;
  expectedPrice: number = 0;

  constructor(items?: TBasketItem[]) {
    if (items) {
      this.basket = [...items];
    }
  }

  add = (newProduct: TProduct) => {
    const idx = this._findIndex("product_number", newProduct.product_number);
    const product = new Product(newProduct);
    if (idx > 0) this.basket[idx].count++;
    else
      this.basket.push({
        id: Math.random(),
        product_number: newProduct.product_number,
        product,
        count: 1,
      });

    this.totalPrice += product._calPrice();
    return this;
  };

  plus = (id: number) => {
    const idx = this._findIndex("id", id);
    if (idx < 0) return this;
    this.basket[idx].count++;
    this.totalPrice += this.basket[idx].product._calPrice();
    return this;
  };

  minus = (id: number) => {
    const idx = this._findIndex("id", id);
    if (idx < 0) return this;
    this.basket[idx].count--;
    this.totalPrice -= this.basket[idx].product._calPrice();
    if (this.basket[idx].count <= 0) this.remove(id);
    return this;
  };

  remove = (id: number) => {
    const idx = this._findIndex("id", id);
    if (id < 0) return this;
    this.totalPrice -= this.basket[idx].product._calPrice() * this.basket[idx].count;
    this.basket.splice(idx, 1);

    return this;
  };

  sum = () => {
    const result = this.basket.reduce((acc, cur) => {
      const count = cur.count;
      const price = cur.product._calPrice();
      return acc + count * price;
    }, 0);

    return result;
  };

  applyCoupon = (newCoupon: TCoupon) => {
    if (this.expectedPrice && !newCoupon.is_enabled_stacking) return { message: "not enabled stacking" };

    const coupon = new Coupon(newCoupon);

    const result = this.expectedPrice
      ? coupon.stackingApply(this.expectedPrice)
      : this.basket.reduce((acc, cur) => {
          const count = cur.count;
          const price = coupon.apply(cur.product);
          return acc + count * price;
        }, 0);

    this.expectedPrice = result;

    return this;
  };

  resetCoupon = () => {
    this.expectedPrice = 0;

    return this;
  };

  _findIndex = (key: keyof TBasketItem, value: number | string) => {
    return this.basket.findIndex((product) => product[key] === value);
  };
}

export default ShoppingBasket;
