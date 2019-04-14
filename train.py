import colorsys
import json

import torch
import torch.nn as nn
from networks import Discriminator, Generator

criterion = nn.MSELoss()

learning_rate = 0.01

discriminator = Discriminator()
generator = Generator()

colorFile = open('data/color.txt')

def get_real_color_tensor():
    line = colorFile.readline()
    if line == '':
        colorFile.seek(0)
        line = colorFile.readline()
        # return None
    colors = json.loads(line)
    data = []
    for color in colors:
        hsv = colorsys.rgb_to_hsv(color[0] / 256, color[1] / 256, color[2] / 256)
        for i in range(3):
            data.append(hsv[i])
    return torch.tensor(data)




isFake = True
def train_discriminator():
    discriminator.zero_grad()
    global isFake
    isFake = not isFake
    if isFake:
        input_tensor = generator(torch.rand(5)).detach()
    else:
        input_tensor = get_real_color_tensor()
    if input_tensor is None:
        return None, None
    output = discriminator(input_tensor)
    loss = criterion(output, torch.tensor(0.0) if isFake else torch.tensor(1.0))
    loss.backward()

    for p in discriminator.parameters():
        p.data.add_(-learning_rate, p.grad.data)

    return output, loss.item()


def train_generator():
    generator.zero_grad()
    generated = generator(torch.rand(5))
    output = discriminator(generated)
    loss = criterion(output, torch.tensor(1.0))
    loss.backward()
    for p in generator.parameters():
        p.data.add_(-learning_rate, p.grad.data)
    return output, loss.item()


def main():
    training_generator = False
    total_loss = 0
    for i in range(100):
        if training_generator:
            print('training generator')
        else:
            print('training discriminator')
        for i in range(2000):
            if training_generator:
                _, loss = train_generator()
            else:
                _, loss = train_discriminator()
            if loss is None:
                return
            total_loss += loss

        print('%.5f' % (total_loss / 2000))

        training_generator = not training_generator
        total_loss = 0



main()

torch.save(discriminator.state_dict(), 'data/discriminator-state-dict')
torch.save(generator.state_dict(), 'data/generator-state-dict')
print('training finished')
