// Chapter 4 프라이버시

export class Dollar {
  // 테스트가 변경됨에 따라 외부에서 amount가 사용될 일이 없어짐.
  private amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
  equals(obj: Dollar): boolean {
    const dollar = obj;
    return this.amount === dollar.amount;
  }
}

// 응집도는 높이고, 결합도는 낮추기
