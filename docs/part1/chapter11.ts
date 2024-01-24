// Chapter 11 모든 악의 근원

export class Money {
  amount: number;
  protected currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  // 하위 클래스에 대한 참조를 없애기 위해 Money를 생성한다.
  static dollar(amt: number): Money {
    return new Money(amt, "USD");
  }

  static franc(amt: number): Money {
    return new Money(amt, "CHF");
  }

  equals(obj: Money): boolean {
    const money: Money = obj;
    return this.currency === money.currency && this.amount === money.amount;
  }

  times(multiplier: number): Money {
    // 4. 하위 클래스의 메서드가 동일해지므로 상위 클래스로 옮긴다.
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency(): string {
    return this.currency;
  }

  toString(): string {
    return this.amount + " " + this.currency;
  }
}

// 하위 클래스에 남아있는 것은 constructor 뿐이다. 이를 위해 하위 클래스가 남아있을 필요는 없어보인다.
// export class Dollar extends Money {
//   constructor(amount: number, currency: string) {
//     super(amount, currency);
//     this.amount = amount;
//     this.currency = currency;
//   }
// }

// export class Franc extends Money {
//   constructor(amount: number, currency: string) {
//     super(amount, currency);
//     this.amount = amount;
//     this.currency = currency;
//   }
// }
