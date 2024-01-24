# Chapter 18 xUnit으로 가는 첫걸음

# 테스트 툴 만들기
# 테스트 케이스 작성 -> 테스트 메서드 실행

# 1. 테스트 케이스가 호출되면 true, 아니면 false
class TestCase:
  def __init__(self, name):
    self.name = name
  def run(self):
    method = getattr(self, self.name)
    method()

class WasRun(TestCase):
  def __init__(self, name):
    self.wasRun = None
    TestCase.__init__(self, name)
  def testMethod(self):
    self.wasRun = 1

class TestCaseTest (TestCase) :
  def testRunning(self):
    test = WasRun("testMethod")
    assert(not test.wasRun)
    test.run()
    assert(test.wasRun)

TestCaseTest("testRunning").run()

# 리팩토링 패턴
# 1. 두 부분으로 나눠서 차별화된 기능을 테스트한 후, 병합하든지 그대로 둔다.
# 2. 특별한 하나의 사례를 가져와 구현한 뒤, 상수를 변수로 변경하여 일반화한다.