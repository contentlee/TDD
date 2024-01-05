// Chapter 8 객체 만들기

export class Money {
  amount: number;

  equals(obj: Money): boolean {
    const money: Money = obj;
    console.log(this.constructor.name, money.constructor.name);
    return this.constructor.name === money.constructor.name && this.amount === money.amount;
  }

  // 추상화를 진행하며 dollar 메서드를 추가한다.
  static dollar(amt: number): Dollar {
    return new Dollar(amt);
  }

  // 추상화를 진행하며 franc 메서드를 추가한다.
  static franc(amt: number): Franc {
    return new Franc(amt);
  }

  times(multiplier: number) {}
}

export class Dollar extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }
  // 1. Dollar와 Franc 각각에 정의된 메서드 times의 형태가 거의 비슷하다.
  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  times(multiplier: number): Money {
    return new Franc(this.amount * multiplier);
  }
}
