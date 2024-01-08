# Chapter 18 xUnit으로 가는 첫걸음

# 테스트 툴 만들기
# 테스트 케이스 작성 -> 테스트 메서드 실행

# 1. 테스트 케이스가 호출되면 true, 아니면 false
class WasRun:
  def __init__(self, name):
    self.wasRun = None
  def testMethod(self):
    self.wasRun = 1

test = WasRun("testMethod")
print (test.wasRun)
test.testMethod()
print (test.wasRun)

