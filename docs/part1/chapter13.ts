// Chapter 13 진짜로 만들기

export interface Expression {
  reduce: (to: string) => Money;
}

export class Money implements Expression {
  amount: number;
  protected currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

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
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency(): string {
    return this.currency;
  }

  toString(): string {
    return this.amount + " " + this.currency;
  }

  plus(addend: Money): Expression {
    // 2. ClassCastExeption
    // return new Money(this.amount + addend.amount, this.currency);
    return new Sum(this, addend);
  }

  reduce(to: string) {
    return this;
  }
}

export class Bank {
  // 4. test reduce sum 테스트에서 볼 수 있듯이 bank를 통해 reduce한 sum은 money로 반환되어야 한다.
  //    반환되는 Money는 같은 통화로 통일되어야 한다.
  reduce(src: Expression, to: string) {
    // return Money.dollar(10);

    // const sum = src;
    // const amount = sum.augend.amount + sum.addend.amount;
    // return new Money(amount, to);
    // 5. 위의 코드가 변경되어야 하는 이유
    //    1. 캐스팅(형변환)이 되지 않는다.
    //    2. 레퍼런스가 두번에 걸쳐 나타나야 한다는 점 (가독성 또는 클래스의 연관성)

    // if (src instanceof Money) return src.reduce(to);
    // const sum = src;
    // return sum.reduce(to);

    return src.reduce(to);
  }
}

// 1. augend와 addend 필드를 가지는 Sum 클래스의 필요성이 발생
// 3. Sum은 Expression 의 일종이어야 한다.
export class Sum implements Expression {
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  // 5-2의 문제를 해결하기 위해 메서드를 추가한다.
  reduce(to: string) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}
