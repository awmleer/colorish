import json
import sys

from utils import random_color_list

f = open(sys.argv[1], mode='a')

for _ in range(int(sys.argv[2])) :
    f.write(json.dumps(random_color_list()) + '\n')
