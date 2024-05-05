import Product from "./product";

export interface TCoupon {
  name: string;
  code_number: string;
  percent: number;
  start_date: string;
  end_date: string;
  is_enabled_stacking: boolean;
}

class Coupon {
  name: string;
  codeNumber: string;
  percent: number;
  startDate: string;
  endDate: string;
  isEnabledStacking: boolean;

  constructor(coupon: TCoupon) {
    this.name = coupon.name;
    this.codeNumber = coupon.code_number;
    this.percent = coupon.percent;
    this.startDate = coupon.start_date;
    this.endDate = coupon.end_date;
    this.isEnabledStacking = coupon.is_enabled_stacking;
  }

  apply(product: Product) {
    if (!this._validateDate()) return product.curPrice;
    if (!this.isEnabledStacking && (product.discount.is_discounted || product.discount.event)) return product.curPrice;
    const price = product.curPrice - Math.floor(product.curPrice * (this.percent / 100));
    return price;
  }

  stackingApply(expectedPrice: number) {
    if (!this._validateDate()) return expectedPrice;
    return Math.floor((expectedPrice * this.percent) / 100);
  }

  _validateDate() {
    const today = new Date().getDate();
    const start = new Date(this.startDate).getDate();
    const end = new Date(this.endDate).getDate();

    return today >= start && today <= end;
  }
}

export default Coupon;
