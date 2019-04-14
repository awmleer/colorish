import json
import random

f = open('data/fake-color.txt', mode='a')

for _ in range(20000) :
    result = []
    for _ in range(5):
        c = []
        for _ in range(3):
            c.append(random.randrange(256))
        result.append(c)
    f.write(json.dumps(result) + '\n')

