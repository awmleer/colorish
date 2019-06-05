import os
import random
import time

import torch

from networks import Discriminator, Generator
from utils import tensor_to_color_list

state_dict_path = 'state-dict'

networks = []
network_dict = {}

def init():
    for dirname in os.listdir(state_dict_path):
        discriminator = Discriminator()
        discriminator.load_state_dict(torch.load(state_dict_path + '/' + dirname + '/discriminator'))
        generator = Generator()
        generator.load_state_dict(torch.load(state_dict_path + '/' + dirname + '/generator'))
        network = {
            'id': dirname,
            'discriminator': discriminator,
            'generator': generator,
        }
        networks.append(network)
        network_dict[dirname] = network
        print('Model #' + dirname + ' loaded.')

init()

def get_network(network_id=None):
    if network_id == '':
        n = random.choice(networks)
        return n
    else:
        return network_dict[network_id]

def generate(network):
    start = time.time()
    generated = network['generator'](torch.rand(16))
    colors = tensor_to_color_list(generated)
    quality = network['discriminator'](generated).item()
    end = time.time()
    return {
        'time': (end - start) * 1000,
        'network_id': network['id'],
        'colors': colors,
        'quality': quality,
    }
