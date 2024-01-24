# 1. print
# print("Hello, world!")

# 2. input, assignment
# input 은 cli에 입력되는 값
# input의 인수는 input 되기 전에 출력되는 값
# input 되는 값이 있을 때까지 print가 호출되지 않음
# name = input("What is your name\n")
# print("Hi, %s." % name)

# 3. For loop built-in enumerate function, new style formatting
# list 는 js의 array와 유사
# enumerate라는 클래스를 통해 순회하며 인덱스와 값을 반환
# js의 백틱을 중괄호가 대체
# format을 통해 중괄호에 들어간 변수를 할당해줌
# 소괄호 안에서 값 할당 가능
# friends = ['john', 'pat', 'gary', 'michael']
# for i, name in enumerate(friends) :
#   print ("iteration {iteration} is {name}".format(iteration=i, name=name))

# 4. Fibonacci, tuple assignment
# tuple : 여러개의 데이터를 하나로 묶는데 사용, 요솟값을 변경 불가
# 해당 과정은 재할당을 통해 가능 한 듯
# 스티링 안에 위치한 변수는 format을 통해 인덱스에 따라 할당되는 듯 
# parents, babies = (1, 1)
# while babies < 100:
#   print ("This generation has {0} babies".format(babies))
#   parents, babies = (babies, parents+babies)


# 5. Functions
# 함수 선언자가 def, 중괄호 대신 : 을 사용
# def great (name) :
#   print ("Hello", name)
# great("Jack")
# great("Jill")

# 6. Import, regular expressions
# import의 from이 없음 (내장 모듈)
# import re
# for test_string in ['555-1212', 'ILL-EGAL']:
#   if re.match(r'^\d{3}-\d{4}$', test_string):
#     print (test_string, "is a valid US local phone number")
#   else:
#     print (test_string, 'rejected')

# 7. Dictionaries, generator expressions
# dictionary 는 js의 Object 와 유사
# sum 은 내장 메서드
# for 문을 저런 방식으로 사용할 수 있다는 것이 큰 장점
# 소수점 출력을 위해 파이썬은 %.2f 를 사용
# prices = {'apple': 0.40, 'banana': 0.50}
# my_purchase = {
#   'apple': 1,
#   'banana': 6
# }
# grocery_bill = sum(prices[fruit] * my_purchase[fruit] for fruit in my_purchase)
# print ('I owe the grocer $%.2f' % grocery_bill)

# 8. Command line arguments, exception handling
# try catch => try except
# import sys
# try:
#   total = sum(int(arg) for arg in sys.argv[1:])
#   print ("sum =", total)
# except ValueError:
#   print ("please supply integer argument")

# 9. Opening files
# glob = unix style pathname extensions
# import glob
# python_files = glob.glob('*.py')
# for file_name in sorted(python_files):
#   print ('    ----' + file_name)

#   with open(file_name) as f:
#     for line in f:
#       print("       " + line.rstrip())
  
#   print()

# 10. Time, conditionals, from..import, for..else
# from time import localtime
# activities = {8: "Sleeping",
#               9: "Commuting",
#               17: "Working",
#               18: "Commuting",
#               20: "Eating",
#               24: "Resting"}

# time_now = localtime()
# hour = time_now.tm_hour

# for activity_time in sorted(activities.keys()):
#   if hour < activity_time:
#     print (activities[activity_time])
#     break
#   else:
#     print ("Unknown, AFK or sleeping!")