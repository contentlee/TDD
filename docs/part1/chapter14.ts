// Chapter 14 바꾸기

export interface Expression {
  reduce: (bank: Bank, to: string) => Money;
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
    return new Sum(this, addend);
  }

  reduce(bank: Bank, to: string) {
    // 1. 변환을 위해 일단 바로 성공할 수 있는 코드를 써본다.
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
  augend: Money;
  addend: Money;

  constructor(augend: Money, addend: Money) {
    this.augend = augend;
    this.addend = addend;
  }

  reduce(bank: Bank, to: string) {
    const amount = this.augend.amount + this.addend.amount;
    return new Money(amount, to);
  }
}

export class Pair {
  private from: string;
  private to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  equals(obj: Pair): boolean {
    const pair = obj;
    return this.from === pair.from && this.to === pair.to;
  }

  hashCode() {
    return 0;
  }
}

// Java에서는 HashTable을 자료형으로 지원하는 것 같으나, JS는 없으므로 추가
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
