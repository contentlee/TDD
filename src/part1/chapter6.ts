// Chapter 6 돌아온 "모두를 위한 평등"

// 상속의 방법으로 중복 해결하기
class Money {
  // 책의 예제에서는 protected로 상속된 영역까지 사용할 수 있도록 했지만, 타입스크립트에서는 하단의 amount 참조에서 에러가 나므로 public으로 변경.
  amount: number;

  // 중복 제거를 위해 eqauls을 Money 객체 안으로 옮김.
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
  // 상속의 성질을 이용해 점차 추상화
  // equals(obj: Money): boolean {
  //   const money: Money = obj;
  //   return this.amount === money.amount;
  // }
}

// 궁극적인 기능인 환율 비교를 위해서는 다른 화폐 객체가 필요
export class Franc extends Money {
  constructor(amount: number) {
    super();
    this.amount = amount;
  }
  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }
  // equals(obj: Franc): boolean {
  //   const dollar = obj;
  //   return this.amount === dollar.amount;
  // }
}
