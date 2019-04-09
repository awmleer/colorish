import colorsys
import random

import torch

from networks import RNN
from utils import tensorToRGB

rnn = RNN(3, 128, 3)

rnn.load_state_dict(torch.load('data/state-dict'))

def sample():
    with torch.no_grad():
        hsv = colorsys.rgb_to_hsv(random.randrange(256)/256, random.randrange(256)/256, random.randrange(256)/256)
        input = torch.zeros(1, 3, dtype=torch.float)
        hidden = rnn.initHidden()
        input[0][0] = hsv[0]
        input[0][1] = hsv[1]
        input[0][2] = hsv[2]
        print(tensorToRGB(input))
        for i in range(4):
            output, hidden = rnn(input, hidden)
            print(tensorToRGB(output))
            input = output

sample()

