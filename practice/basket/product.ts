export interface TDiscountEvent {
  name: string;
  start_date: string;
  end_date: string;
  percent: number;
}

export interface TDiscount {
  is_discounted: boolean;
  percent: number;
  event: TDiscountEvent | null;
}

export interface TProduct {
  id: number;
  product_number: string;
  name: string;
  category: string;
  discount: TDiscount;
  price: number;
  detail: string;
  img: string;
  add_date: string;
}

class Product {
  id: number;
  productNumber: string;
  name: string;
  category: string;
  discount: TDiscount;
  originPrice: number;
  curPrice: number;
  detail: string;
  img: string;
  addDate: string;

  constructor(item: TProduct) {
    this.id = item.id;
    this.productNumber = item.product_number;
    this.name = item.name;
    this.category = item.category;
    this.discount = item.discount;
    this.originPrice = item.price;
    this.curPrice = this._calPrice();
    this.detail = item.detail;
    this.img = item.img;
    this.addDate = item.add_date;
  }

  _calPrice = () => {
    let price = this.originPrice;
    const isDiscounted = this.discount.is_discounted;

    if (!isDiscounted) return price;

    if (this._validateDate()) {
      const discount = Math.floor(price * (this.discount.event!.percent / 100));
      price -= discount;
    } else {
      const discount = Math.floor(price * (this.discount.percent / 100));
      price -= discount;
    }
    return price;
  };

  _validateDate = () => {
    const event = this.discount.event;
    if (!event) return false;

    const today = new Date().getDate();
    const start = new Date(event.start_date).getDate();
    const end = new Date(event.end_date).getDate();

    return today >= start && today <= end;
  };
}

export default Product;
