n=int(input())
X= input()
Y=X.split(" ")
N= int(input())

ind=-1
flag=-1
for i in Y:
    ind=ind+1
    if int(i)==N:
        flag=ind
        break

print(flag)