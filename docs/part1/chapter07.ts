// Chapter 7 사과와 오렌지

class Money {
  amount: number = 0;

  equals(obj: Money): boolean {
    const money: Money = obj;
    console.log(this.constructor.name, money.constructor.name);
    return this.constructor.name === money.constructor.name && this.amount === money.amount;
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

// test code 작성 중 만난 문제 1
// 자바에서는 getClass를 통해 각 Class가 구분이 되는 것 같지만
// 자바스크립트에서는 불가능
// 어떻게 해결할 수 있을까?

// stackoverflow에 친절한 답변들이 많았고,
// constructor의 name을 참조하여 비교하는 것으로 해결하였다.
// https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
