localping_result = redis.call("PING")        
localset_result = redis.call("SET", KEYS[1], ARGV[1])        
return{ping_result, set_result}