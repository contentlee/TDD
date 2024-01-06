// Chapter 15 서로 다른 통화 더하기

export interface Expression {
  reduce: (bank: Bank, to: string) => Money;
  times: (multiplier: number) => Expression;
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

  times(multiplier: number): Expression {
    return new Money(this.amount * multiplier, this.currency);
  }

  getCurrency(): string {
    return this.currency;
  }

  toString(): string {
    return this.amount + " " + this.currency;
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  reduce(bank: Bank, to: string) {
    const rate = bank.rate(this.currency, to);
    return new Money(this.amount / rate, to);
  }
}

export class Bank {
  private rates: Hashtable = new Hashtable();
  reduce(src: Expression, to: string) {
    return src.reduce(this, to);
  }

  rate(from: string, to: string): number {
    if (from === to) return 1;
    const rateVal = this.rates.get(new Pair(from, to));
    return rateVal;
  }

  addRate(from: string, to: string, rate: number) {
    this.rates.put(new Pair(from, to), rate);
  }
}

export class Sum implements Expression {
  augend: Expression;
  addend: Expression;

  constructor(augend: Expression, addend: Expression) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string) {
    const amount = this.augend.reduce(bank, to).amount + this.addend.reduce(bank, to).amount;
    return new Money(amount, to);
  }

  plus(addend: Expression): Expression {
    return new Sum(this, addend);
  }

  times(multiplier: number): Expression {
    return new Sum(this.augend.times(multiplier), this.addend.times(multiplier));
  }
}

export class Pair {
  private from: string;
  private to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  equals(obj): boolean {
    const pair = obj;
    return this.from === pair.from && this.to === pair.to;
  }

  hashCode() {
    return 0;
  }
}

class Hash {
  key: any;
  value: any;

  constructor(key: any, value: any) {
    this.key = key;
    this.value = value;
  }
}

class Hashtable {
  private table: any[] = [];

  get(key: any) {
    const idx = this.table.findIndex((obj) => {
      if (typeof key === "object") {
        return Object.is(obj.key, key);
      }
      return obj.key === key;
    });
    if (idx < 0) return null;
    return this.table[idx].value;
  }
  put(key: any, val: any) {
    this.table.push(new Hash(key, val));
  }
}

/// 결론이 실험 실패라니....!?!?!?!?!?!?!?
