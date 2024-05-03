class TestCase {
  constructor(name) {
    this.name = name;
  }
  setUp = () => {
    return;
  };
  run = () => {
    this.setUp();
    if (!this[this.name]) return;
    const method = this[this.name];
    method();
    this.tearDown();
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
    this.setUp();
    this.test.run();
    console.log("setUp testMethod tearDown" === this.test.log);
  };
  // testRunning = () => {
  //   const test = new WasRun("testMethod");
  //   test.run();
  //   return test.wasRun;
  // };
  // testSetUp = () => {
  //   this.setUp();
  //   this.test.run();
  //   return this.test.wasSetUp;
  // };
}

const test = new TestCaseTest("testTemplateMethod");
test.run();
