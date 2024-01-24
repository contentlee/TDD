// Chapter 12 드디어, 더하기

// 할 일 목록이 꽤나 줄어들었고, 다시 정리할 필요가 있다.
// 남아있는 할 일 목록 중 그대로 두면 누적될 만한 일부터 처리하자.
// (개인에 따라서 선택하자!)

interface Expression {}

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

  // 다중 통화 연산을 위해 고민의 시간이 필요하다.
  // 다중 통화 사용에 대한 내용을 시스템의 내부로 숨기고 싶다는 생각이 강할 것이다.
  // 방법 중 하나는 참조 통화로 모든 값을 전환하는 것이다.
  // 단점은 여러 환율을 쓰기가 수비지 않다는 점이다.
  // 이를 해결하기 위해 우리는 객체를 사용할 것이다.
  // 객체와 외부 프로토콜이 같으면서내부 구현은 다른 imposter를 만들어 해결한다.
  plus(addend: Money): Expression {
    return new Money(this.amount + addend.amount, this.currency);
  }
}

export class Bank {
  reduce(src: Expression, to: string) {
    return Money.dollar(10);
  }
}
