import colorsys
import json
import random
import sys

import torch

from networks import RNN, Discriminator, Generator
from utils import tensorToRGB, color_list_to_tensor, tensor_to_color_list

discriminator = Discriminator()
discriminator.load_state_dict(torch.load('data/discriminator-state-dict'))

generator = Generator()
generator.load_state_dict(torch.load('data/generator-state-dict'))

def sample():
    generated = generator(torch.rand(16))
    colors = tensor_to_color_list(generated)
    for color in colors:
        print('<div class="color-block" style="background-color: rgb(%d, %d, %d)"></div>' % (color[0], color[1], color[2]))

for i in range(int(sys.argv[1])):
    print('<div class="schema">')
    sample()
    print('</div>')
    print('')
