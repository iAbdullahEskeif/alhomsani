def add(num1,num2,**extra):
    print(extra)
    return num1+num2

kwargs={"num1":1,"num2":2,"ali":'test'}
x=add(1,2,ios="here")
print(x)
#Unpacking dictionary operator
