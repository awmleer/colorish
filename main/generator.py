import os
import random

import torch

from networks import Discriminator, Generator
from utils import tensor_to_color_list

state_dict_path = 'state-dict'

networks = []

for dirname in os.listdir(state_dict_path):
    discriminator = Discriminator()
    discriminator.load_state_dict(torch.load(state_dict_path + '/' + dirname + '/discriminator'))
    generator = Generator()
    generator.load_state_dict(torch.load(state_dict_path + '/' + dirname + '/generator'))
    networks.append({
        'discriminator': discriminator,
        'generator': generator,
    })
    print('Model #' + dirname + ' loaded.')

def generate():
    network = random.choice(networks)
    generated = network['generator'](torch.rand(16))
    colors = tensor_to_color_list(generated)
    return colors
