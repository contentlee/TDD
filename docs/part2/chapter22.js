class TestResult {
  constructor() {
    this.runCount = 0;
    this.failedCount = 0;
  }

  testStarted = () => {
    this.runCount += 1;
  };

  testFailed = () => {
    this.failedCount += 1;
  };

  summary = () => {
    return `${this.runCount} run, ${this.failedCount} failed`;
  };
}

class TestCase {
  constructor(name) {
    this.name = name;
  }
  setUp = () => {
    return;
  };
  run = () => {
    const result = new TestResult();
    result.testStarted();

    this.setUp();

    try {
      if (!this[this.name]) return;
      const method = this[this.name];
      method();
    } catch {
      result.testFailed();
    }

    this.tearDown();
    return result;
  };

  tearDown = () => {
    return;
  };
}

class WasRun extends TestCase {
  constructor(name) {
    super(name);
    this.wasRun = 0;
  }

  testMethod = () => {
    this.wasRun = 1;
    this.log += "testMethod ";
  };

  setUp = () => {
    this.wasRun = 0;
    this.wasSetUp = 1;
    this.log = "setUp ";
  };

  tearDown = () => {
    this.log += "tearDown";
  };
}

class TestCaseTest extends TestCase {
  constructor(name) {
    super(name);
  }

  setUp = () => {
    this.test = new WasRun("testMethod");
  };
  testTemplateMethod = () => {
    const test = new WasRun("testMethod");
    test.run();
    console.log("setUp testMethod tearDown" === test.log);
  };

  testResult = () => {
    const test = new WasRun("testMethod");
    const result = test.run();
    console.log("1 run, 0 failed" == result.summary());
  };

  testFailedResult = () => {
    const test = new WasRun("testBrokenMethod");
    const result = test.run();
    console.log("1 run, 1 failed" === result.summary());
  };
}

const test1 = new TestCaseTest("testTemplateMethod");
const test2 = new TestCaseTest("testResult");

test1.run();
test2.run();
