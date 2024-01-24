// Chapter 2 타락한 객체

// remind
// 1. 테스트를 작성한다. (이야기를 써내려가듯이) 원하는 인터페이스를 만들고, 답을 위한 요소를 모두 포함시켜야 한다.
// 2. 실행 가능하게 수정한다. 우선적인 목표는 초록 상태를 보는 것이기 때문에, 가장 빨리 볼 수 있는 방법으로 수정한다.
// 3. 올바르게 만든다. 소프트웨어 정의(software righteousness)로 돌아오자!

// 1. 작동하는 => 2. 깔끔한 코드

export class Dollar {
  amount: number;
  constructor(amount: number) {
    this.amount = amount;
  }
  times(multiplier: number): Dollar {
    // 다른 multiplier 를 인자로 할당할 때 amount가 상태값을 유지해버리는 문제를 해결하기 위해
    // 새로운 Dollar 객체를 반환한다.
    // 1장의 가짜 구현 => 2장 명백한 구현
    return new Dollar(this.amount * multiplier);
  }
}

// "느낌(부작용에 대한 혐오감)을 테스트(하나의 Dollar 객체에 곱하기를 두 번 수행하는 것)로 변환하는 것은 TDD의 일반적 주제다" (p 57)
