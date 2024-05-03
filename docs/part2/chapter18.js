class TestCase {
  constructor(name) {
    this.name = name;
  }
  run = () => {
    if (!this[this.name]) return;
    const method = this[this.name];
    method();
  };
}

class WasRun extends TestCase {
  constructor(name) {
    super(name);
    this.wasRun = 0;
  }

  testMethod = () => {
    this.wasRun = 1;
  };
}

class TestCaseTest extends TestCase {
  constructor(name) {
    super(name);
  }

  testRunning = () => {
    const test = new WasRun("testMethod");
    test.run();
    if (!test.wasRun) throw Error("not found wasRun");
    test.run();
    if (!test.wasRun) throw Error("not found wasRun");
  };
}

const Test = new TestCaseTest("testRunning");
Test.run();
