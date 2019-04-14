import colorsys
import json
import random

import torch

from networks import RNN, Discriminator, Generator
from utils import tensorToRGB, color_list_to_tensor

discriminator = Discriminator()
discriminator.load_state_dict(torch.load('data/discriminator-state-dict'))

generator = Generator()
generator.load_state_dict(torch.load('data/generator-state-dict'))

def sample():
    generated = generator(torch.rand(5))
    print(tensorToRGB(generated.reshape((5, 3))))


for i in range(5):
    sample()
