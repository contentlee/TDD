// Chapter 9 우리가 사는 시간

// 하위 클래스 제거를 위해 통화 목록을 만들자는 목표를 세우게 된다.

export class Money {
  amount: number;
  protected currency: string;

  // 생성자를 통일한 훟 구현을 상위 클래스로 옮겨라.
  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  equals(obj: Money): boolean {
    const money: Money = obj;
    return this.constructor.name === money.constructor.name && this.amount === money.amount;
  }

  static dollar(amt: number): Dollar {
    return new Dollar(amt, "USD");
  }

  static franc(amt: number): Franc {
    return new Franc(amt, "CHF");
  }

  times(multiplier: number) {}

  // 1. 추상화하기 이전에 abstract 메서드를 만든다.
  // 3. 하위 클래스의 getCurrency가 동일한 형태를 띄므로 상위 클래스로 메서드를 이전.
  getCurrency(): string {
    return this.currency;
  }
}

export class Dollar extends Money {
  // 2. 두 클래스를 합치기 위해 생성 단계예서 통화를 결정하도록 한다.
  // currency: string = "";
  constructor(amount: number, currency: string) {
    super(amount, currency);
    this.amount = amount;
    this.currency = currency;
  }
  times(multiplier: number): Money {
    // return new Dollar(this.amount * multiplier);
    return Money.dollar(this.amount * multiplier);
  }
  // getCurrency(): string {
  //   return this.currency;
  // }
}

export class Franc extends Money {
  // currency: string;
  constructor(amount: number, currency: string) {
    super(amount, currency);
    this.amount = amount;
    this.currency = currency;
  }

  times(multiplier: number): Money {
    // 생성의 원리가 공통된 특징을 갖기 위해 생성 방식을 변경.
    // return new Franc(this.amount * multiplier, null);
    return Money.franc(this.amount * multiplier);
  }

  // getCurrency(): string {
  //   return this.currency;
  // }
}

// 중간 중간 수정해야할 부분이 생겼을 떄,
// 문제의 크기가 작다면 즉각적으로 수정
// 크다면 오류를 빠르게 해결하고 현재 문제에 집중하라.

// TDD의 진행 속도는 스스로에 맞게 결정하라.
// 마치 걸음걸이와 같이.
