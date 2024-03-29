# Chapter 20 뒷정리하기

# 테스트 전략 변경 : flag 확인에서 log 확인으로!
class TestCase:
  def __init__(self, name):
    self.name = name
  def setUp(self):
    pass
  def run(self):
    self.setUp()
    method = getattr(self, self.name)
    method()
    self.tearDown()
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

class TestCaseTest (TestCase) :
  def setUp(self) :
    self.test = WasRun("testMethod")
  def testTemplateMethod(self):
    test= WasRun("testMethod")
    test.run()
    assert("setUp testMethod tearDown " == test.log)

TestCaseTest("testTemplateMethod").run()
