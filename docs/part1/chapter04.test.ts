import { it, expect, describe } from "@jest/globals";
import { Dollar } from "./chapter04";

describe("test", () => {
  it("test multiplication", () => {
    const five = new Dollar(5);
    // 객체끼리 비교하는 것으로 재작성
    expect({ ...new Dollar(10) }).toMatchObject({ ...five.times(2) });
    // 객체끼리 비교하는 것으로 재작성
    expect({ ...new Dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("testEquality", () => {
    // 동치성(equality)
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
  });
});
