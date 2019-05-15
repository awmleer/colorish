import colorsys
import json
import random

import torch

from networks import Discriminator
from utils import tensorToRGB, color_list_to_tensor

discriminator = Discriminator()
discriminator.load_state_dict(torch.load('data/discriminator-state-dict'))

def sample(colors):
    with torch.no_grad():
        input_tensor = color_list_to_tensor(colors)
        output = discriminator(input_tensor)
        print(json.dumps(colors))
        print(output)

# rnn = RNN(3, 8, 3)
#
# rnn.load_state_dict(torch.load('data/state-dict'))
#
# def sample():
#     with torch.no_grad():
#         # hsv = colorsys.rgb_to_hsv(random.randrange(256)/256, random.randrange(256)/256, random.randrange(256)/256)
#         hsv = colorsys.rgb_to_hsv(32/256, 44/256, 225/256)
#         input = torch.zeros(1, 3, dtype=torch.float)
#         hidden = rnn.initHidden()
#         input[0][0] = hsv[0]
#         input[0][1] = hsv[1]
#         input[0][2] = hsv[2]
#         print(tensorToRGB(input))
#         for i in range(4):
#             output, hidden = rnn(input, hidden)
#             print(tensorToRGB(output))
#             input = output

with open('data/color-for-sample.txt') as f:
    while True:
        line = f.readline()
        if line == '':
            break
        sample(json.loads(line))

