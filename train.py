import colorsys
import json
import os
import random

import torch
import torch.nn as nn
from networks import Discriminator, Generator

criterion = nn.MSELoss()

discriminator = Discriminator()
generator = Generator()

def weights_init(m):
    classname = m.__class__.__name__
    if 'Linear' in classname:
        nn.init.normal_(m.weight.data, 0.048, 0.5)

generator.apply(weights_init)
discriminator.apply(weights_init)

color_file = open('data/kuler.txt')
color_file.seek(0, os.SEEK_END)
color_file_size = color_file.tell()

def random_color_file_seek():
    color_file.seek(random.randint(0, color_file_size))
    color_file.readline()

def get_real_color_tensor():
    line = color_file.readline()
    if line == '':
        color_file.seek(0)
        line = color_file.readline()  # return None
    colors = json.loads(line)
    data = []
    for color in colors:
        hsv = colorsys.rgb_to_hsv(color[0] / 256, color[1] / 256, color[2] / 256)
        for i in range(3):
            data.append(hsv[i])
    return torch.tensor(data)

discriminator_learning_rate = 0.01
isFake = True

def train_discriminator():
    random_color_file_seek()
    discriminator.zero_grad()
    global isFake
    isFake = not isFake
    if isFake:
        input_tensor = generator(torch.rand(16)).detach()
    else:
        input_tensor = get_real_color_tensor()
    if input_tensor is None:
        return None, None
    output = discriminator(input_tensor)
    loss = criterion(output, torch.tensor(0.0) if isFake else torch.tensor(1.0))
    loss.backward()

    for p in discriminator.parameters():
        p.data.add_(-discriminator_learning_rate, p.grad.data)

    return output, loss.item()

generator_learning_rate = 0.015

def train_generator():
    generator.zero_grad()
    generated = generator(torch.rand(16))
    output = discriminator(generated)
    loss = criterion(output, torch.tensor(1.0))
    loss.backward()
    for p in generator.parameters():
        p.data.add_(-generator_learning_rate, p.grad.data)
    return output, loss.item()

def do_training():
    training_generator = False
    total_loss = 0
    total_round = 150
    batch_size = 800
    loss_threshold_count = 0
    for i in range(2 * total_round):
        if i % 2 == 0:
            print('%d/%d' % (i // 2 + 1, total_round))
        if training_generator:
            print('G', end=' ')
        else:
            print('D', end=' ')
        for _ in range(batch_size):
            if training_generator:
                _, loss = train_generator()
            else:
                _, loss = train_discriminator()
            if loss is None:
                return
            total_loss += loss
        average_loss = total_loss / batch_size
        print('%.5f' % average_loss, end=' ')
        if (i >= 240 and average_loss < 0.1) or (i >= 160 and average_loss < 0.09) or (i >= 120 and average_loss < 0.08) or (i >= 80 and average_loss < 0.07):
            loss_threshold_count += 1
        else:
            loss_threshold_count = 0
        if loss_threshold_count >= 6:
            print('')
            break
        if i % 2 != 0:
            print('')
        training_generator = not training_generator
        total_loss = 0


def train():
    do_training()
    torch.save(discriminator.state_dict(), 'temp/discriminator')
    torch.save(generator.state_dict(), 'temp/generator')
    print('training finished')

if __name__ == '__main__':
    train()

