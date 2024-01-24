// Chapter 10 흥미로운 시간

export class Money {
  amount: number;
  protected currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  static dollar(amt: number): Dollar {
    return new Dollar(amt, "USD");
  }

  static franc(amt: number): Franc {
    return new Franc(amt, "CHF");
  }

  equals(obj: Money): boolean {
    const money: Money = obj;
    return this.currency === money.currency && this.amount === money.amount;
  }

  times(multiplier: number) {
    // 4. 하위 클래스의 메서드가 동일해지므로 상위 클래스로 옮긴다.
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency(): string {
    return this.currency;
  }

  // 해당 메서드는 디버깅을 위해 사용될 메서드이므로 테스트 없이 추가했다.
  toString(): string {
    return this.amount + " " + this.currency;
  }
}

export class Dollar extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency);
    this.amount = amount;
    this.currency = currency;
  }

  // 1. Dollar와 Franc의 times를 통일하기 위한 방법이 무엇일까?
  // times(multiplier: number): Money {
  // return Money.dollar(this.amount * multiplier);
  // 2. 이전 장에서 바꿨었지만, 해당 동작을 통일하기 위해 다시 한 번 생성자를 반환하는 방식으로 변경해본다.
  // return new Dollar(this.amount * multiplier, this.currency);
  // 3. 메서드가 공통되기 위해서는 개별적 클래스를 반환하는게 아닌 단일한 클래스를 반환하는 것이 좋을 것 같다.
  //   return new Money(this.amount * multiplier, this.currency);
  // }
}

export class Franc extends Money {
  constructor(amount: number, currency: string) {
    super(amount, currency);
    this.amount = amount;
    this.currency = currency;
  }

  // times(multiplier: number): Money {
  //   return new Money(this.amount * multiplier, this.currency);
  // return Money.franc(this.amount * multiplier);
  // }
}
