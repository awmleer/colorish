import json
import sys

# from utils import random_color_list
import torch

from networks import Generator

generator = Generator()
generator.load_state_dict(torch.load('data/generator-state-dict'))

f = open(sys.argv[1], mode='a')

for _ in range(int(sys.argv[2])):
    generated = generator(torch.rand(5))
    colors = generated.reshape((5, 3)).tolist()
    f.write(json.dumps(colors) + '\n')
