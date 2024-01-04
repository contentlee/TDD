import { it, expect } from "@jest/globals";
import { Dollar } from "./chapter4";

it("test multiplication", () => {
  const five = new Dollar(5);
  // 객체끼리 비교하는 것으로 재작성
  expect({ ...new Dollar(10) }).toMatchObject({ ...five.times(2) });
  // 객체끼리 비교하는 것으로 재작성
  expect({ ...new Dollar(15) }).toMatchObject({ ...five.times(3) });
});
