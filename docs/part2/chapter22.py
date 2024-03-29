# Chapter 22 실패 처리하기


class TestResult:
  def __init__(self):
    self.runCount = 0
    self.failedCount = 0
  def testStarted(self):
    self.runCount = self.runCount + 1
  def testFailed(self):
    self.failedCount = self.failedCount + 1
  def summary(self):
    return "%d run, %d failed" % (self.runCount, self.failedCount)

class TestCase:
  def __init__(self, name):
    self.name = name
  def setUp(self):
    pass
  def run(self):
    result = TestResult()
    result.testStarted()
    self.setUp()
    try:
      method = getattr(self, self.name)
      method()
    except:
      result.testFailed()
    self.tearDown()
    return result
  def tearDown(self):
    pass

class WasRun(TestCase):
  def __init__(self, name):
    self.wasRun = None
    TestCase.__init__(self, name)
  def testMethod(self):
    self.wasRun = 1
    self.log= self.log + "testMethod "
  def setUp(self):
    self.wasRun = None
    self.wasSetUp = 1
    self.log = "setUp "
  def tearDown(self):
    self.log = self.log + "tearDown "
  def testBrokenMethod(self):
    raise Exception

class TestCaseTest (TestCase) :
  def setUp(self) :
    self.test = WasRun("testMethod")
  def testTemplateMethod(self):
    test= WasRun("testMethod")
    test.run()
    assert("setUp testMethod tearDown " == test.log)
  def testResult(self):
    test= WasRun("testMethod")
    result = test.run()
    assert("1 run, 0 failed" == result.summary())
  def testFailedResult(self):
    result = TestResult()
    result.testStarted()
    result.testFailed()
    assert("1 run, 1 failed" == result.summary())

TestCaseTest("testTemplateMethod").run()
TestCaseTest("testResult").run()
