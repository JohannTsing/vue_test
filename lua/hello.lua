print("hello lua !")
print("hello johann !")
zero=0
print(zero)

print(type("Hello world"))      --> string
print(type(10.4*3))             --> number
print(type(print))              --> function
print(type(type))               --> function
print(type(true))               --> boolean
print(type(nil))                --> nil
print(type(type(X)))            --> string
print(type(X))                  --> nil

--nil 作比较时应该加上双引号 "
print(type(X)==nil)             --> false
print(type(X)=="nil")           --> true         

redis.call('ZADD',KEYS[1],ARGV[1],ARGV[2],ARGV[3],ARGV[4])

"fruits-price" 8.5 "apple" 3.5 "banana"

--这是单行注释

--[[
    这是多行注释
]]

--[[
Lua 标示符用于定义一个变量，函数获取其他用户定义的项。标示符以一个字母 A 到 Z 或 a 到 z 或下划线 _ 开头后加上 0 个或多个字母，下划线，数字（0 到 9）。

最好不要使用下划线加大写字母的标示符，因为Lua的保留字也是这样的。

Lua 不允许使用特殊字符如 @, $, 和 % 来定义标示符。 Lua 是一个区分大小写的编程语言。


Lua 的保留关键词,保留关键字不能作为常量或变量或其他用户自定义标示符

and    break    do    else
elseif    end    false    for
function    if    in    local
nil    not    or    repeat
return    then    true  until
while    goto		

一般约定，以下划线开头连接一串大写字母的名字（比如 _VERSION）被保留用于 Lua 内部全局变量。
]]