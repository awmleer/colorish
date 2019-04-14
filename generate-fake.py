import json
import random
import sys

f = open(sys.argv[1], mode='a')

for _ in range(int(sys.argv[2])) :
    result = []
    for _ in range(5):
        c = []
        for _ in range(3):
            c.append(random.randrange(256))
        result.append(c)
    f.write(json.dumps(result) + '\n')

