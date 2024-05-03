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
  run = (result) => {
    result.testStarted();

    this.setUp();

    try {
      if (!this[this.name]) throw new Error();
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

class TestSuite {
  constructor() {
    this.tests = [];
  }

  add = (test) => {
    this.tests.push(test);
  };

  run = (result) => {
    this.tests.forEach((test) => {
      test.run(result);
    });
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
    this.setUp();
  }

  setUp = () => {
    this.result = new TestResult();
  };
  testTemplateMethod = () => {
    const test = new WasRun("testMethod");
    test.run(this.result);
    console.log("setUp testMethod tearDown" === test.log);
  };

  testResult = () => {
    const test = new WasRun("testMethod");
    test.run(this.result);
    console.log("1 run, 0 failed" === this.result.summary());
  };

  testFailedResult = () => {
    const test = new WasRun("testBrokenMethod");
    test.run(this.result);
    console.log("1 run, 1 failed" === this.result.summary());
  };

  testSuite = () => {
    const suite = new TestSuite();
    suite.add(new WasRun("testMethod"));
    suite.add(new WasRun("testBrokenMethod"));
    suite.run(this.result);
    console.log("2 run, 1 failed" === this.result.summary());
  };
}

const suite = new TestSuite();
suite.add(new TestCaseTest("testTemplateMethod"));
suite.add(new TestCaseTest("testResult"));
suite.add(new TestCaseTest("testFailedResult"));
suite.add(new TestCaseTest("testSuite"));

const result = new TestResult();
suite.run(result);
