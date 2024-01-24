// Chapter 5 솔직히 말하자면

export class Dollar {
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

// 궁극적인 기능인 환율 비교를 위해서는 다른 화폐 객체가 필요
export class Franc {
  private amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  times(multiplier: number): Franc {
    return new Franc(this.amount * multiplier);
  }
  equals(obj: Franc): boolean {
    const dollar = obj;
    return this.amount === dollar.amount;
  }
}
