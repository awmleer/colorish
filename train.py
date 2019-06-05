import colorsys
import json
import os
import random
import time

import torch
import torch.nn as nn
from networks import Discriminator, Generator
from utils import tensor_to_color_list

criterion = nn.MSELoss()

discriminator = Discriminator()
generator = Generator()

training_log = {
    'time': time.time(),
    'rounds': [],
}

def weights_init(m):
    # pass
    classname = m.__class__.__name__
    if 'Linear' in classname:
        nn.init.normal_(m.weight.data, 0.048, 0.48)

generator.apply(weights_init)
discriminator.apply(weights_init)

color_file = open('data/color.txt')
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

discriminator_learning_rate = 0.009
isFake = True

def train_discriminator(i):
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

generator_learning_rate = 0.01

def train_generator(i):
    generator.zero_grad()
    generated = generator(torch.rand(16))
    output = discriminator(generated)
    loss = criterion(output, torch.tensor(1.0))
    loss.backward()
    for p in generator.parameters():
        p.data.add_(-generator_learning_rate, p.grad.data)
    return output, loss.item()

def sample():
    generated = generator(torch.rand(16))
    colors = tensor_to_color_list(generated)
    for color in colors:
        print('<div class="color-block" style="background-color: rgb(%d, %d, %d)"></div>' % (color[0], color[1], color[2]))
    return colors

def do_training():
    training_generator = False
    total_loss = 0
    total_round = 220
    batch_size = 600
    # loss_threshold_count = 0
    for i in range(total_round):
        current_mode = 'G' if training_generator else 'D'
        if i % 2 == 0:
            print('%d - %d' % (i + 1, i + 2))
        print(current_mode, end=' ')
        for _ in range(batch_size):
            if training_generator:
                _, loss = train_generator(i)
            else:
                _, loss = train_discriminator(i)
            if loss is None:
                return
            total_loss += loss
        average_loss = total_loss / batch_size
        print('%.5f' % average_loss, end=' ')
        training_log['rounds'].append({
            'mode': current_mode,
            'loss': average_loss,
        })
        # if (i >= 240 and average_loss < 0.12) or (i >= 180 and average_loss < 0.1) or (i >= 120 and average_loss < 0.09) or (i >= 80 and average_loss < 0.08):
        #     loss_threshold_count += 1
        # else:
        #     loss_threshold_count = 0
        # if loss_threshold_count >= 6:
        #     print('')
        #     break
        if i % 2 != 0:
            print('')
        training_generator = not training_generator
        total_loss = 0

        #test
        # if (i + 1) % 50 == 0:
        #     print(i+1)
        #     print('<div>')
        #     for i in range(5):
        #         print('<div class="scheme">')
        #         sample()
        #         print('</div>')
        #     print('</div>')



def train(target_dir='temp/'):
    do_training()
    torch.save(discriminator.state_dict(), target_dir + '/discriminator')
    torch.save(generator.state_dict(), target_dir + '/generator')
    with open(target_dir + '/log.json', 'w') as log_file:
        json.dump(training_log, log_file)
    print('Training finished.')

if __name__ == '__main__':
    train()

