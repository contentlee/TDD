// Chapter 7 사과와 오렌지

class Money {
  amount: number;

  equals(obj: Money): boolean {
    const money: Money = obj;
    return this.amount === money.amount;
  }
}

export class Dollar extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  times(multiplier: number): Money {
    return new Dollar(this.amount * multiplier);
  }
}

export class Franc extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }

  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }
}
