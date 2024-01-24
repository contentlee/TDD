import { describe, it, expect } from "@jest/globals";
import { Dollar, Franc } from "./chapter6";

describe("test", () => {
  it("test multiplication", () => {
    const five = new Dollar(5);
    expect({ ...new Dollar(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...new Dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test equality", () => {
    expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy();
    expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy();
    expect(new Franc(5).equals(new Franc(5))).toBeTruthy();
    expect(new Franc(5).equals(new Franc(6))).toBeFalsy();
  });

  it("test dollar multiplication", () => {
    const five = new Dollar(5);
    expect({ ...new Dollar(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...new Dollar(15) }).toMatchObject({ ...five.times(3) });
  });

  it("test franc multiplication", () => {
    const five = new Franc(5);
    expect({ ...new Franc(10) }).toMatchObject({ ...five.times(2) });
    expect({ ...new Franc(15) }).toMatchObject({ ...five.times(3) });
  });
});
