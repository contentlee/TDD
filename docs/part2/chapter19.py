# Chapter 19 테이블 차리기

# 빌웨이크(Bill Wake)의 3A (p.169)
# 준비(arrage) : 객체를 생성한다.
# 행동(act) : 어떤 자극을 준다.
# 확인(assert) : 결과를 검사한다.

# 테스트를 위해 새로운 객체를 얼마나 자주 생성해야 하는가?
# 성능과 격리의 상충된 제약

# *** 테스트 커플링을 만들지 말 것 ***

class TestCase:
  def __init__(self, name):
    self.name = name
  def setUp(self):
    pass
  def run(self):
    self.setUp()
    method = getattr(self, self.name)
    method()

class WasRun(TestCase):
  def __init__(self, name):
    self.wasRun = None
    TestCase.__init__(self, name)
  def testMethod(self):
    self.wasRun = 1
  def setUp(self):
    self.wasRun = None
    self.wasSetUp = 1

class TestCaseTest (TestCase) :
  def setUp(self) :
    self.test = WasRun("testMethod")
  def testRunning(self):
    test = WasRun("testMethod")
    test.run()
    assert(test.wasRun)
  def testSetUp(self):
    self.test.run()
    assert(self.test.wasSetUp)

TestCaseTest("testSetUp").run()
TestCaseTest("testRunning").run()

# 테스트의 실행을 확인 한 후, 한 번에 하나의 메서드만 수정해서 테스트가 통과되도록 노력
