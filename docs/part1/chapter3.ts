// Chapter 3 모두를 위한 평등

// 값 객체 패턴(value object pattern) : Dollar 객체같이 객체를 값처럼 쓸수 있는 패턴

// 삼각측량 : 라디오 신호를 두 수신국이 감지하고 있을 때, 두 수신국 사이의 거리, 신호의 방향로 신호의 거리와 방위를 계산하는 방법
// 리팩토링에 대한 감이 오지 않을 때 유용하게 사용

export class Dollar {
  amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  times(multiplier: number): Dollar {
    return new Dollar(this.amount * multiplier);
  }
  equals(obj: Dollar): boolean {
    // 초록 신호를 볼 수 있는 가장 빠른 방법을 선택한다. (가짜 구현)
    // return true;

    // 동치성(equality)를 일반화 한다. (명백한 구현)
    const dollar = obj;
    return this.amount === dollar.amount;
  }
}
