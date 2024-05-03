class TestCase {
  constructor(name) {
    this.name = name;
  }
  setUp = () => {
    return;
  };
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

  setUp = () => {
    this.wasRun = 0;
    this.wasSetUp = 1;
  };
}

class TestCaseTest extends TestCase {
  constructor(name) {
    super(name);
  }

  setUp = () => {
    this.test = new WasRun("testMethod");
  };
  testRunning = () => {
    const test = new WasRun("testMethod");
    test.run();
    return test.wasRun;
  };
  testSetUp = () => {
    this.setUp();
    this.test.run();
    return this.test.wasSetUp;
  };
}

const TestSetUp = new TestCaseTest("testSetUp");
const TestRunning = new TestCaseTest("testRunning");
TestSetUp.run();
TestRunning.run();
