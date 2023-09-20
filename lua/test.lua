a3 = {}
for i = 1, 3 do
 a3[i] = i
end
a3["key"] = "val"
-- print(a3["key"])
-- print(a3["none"])
 
for key, value in pairs(a3) do
    print("key-value: " .. key .. "--" .. value)
end
