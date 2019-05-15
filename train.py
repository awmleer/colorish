import colorsys
import json

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




discriminator_learning_rate = 0.008
isFake = True
def train_discriminator():
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

loss_threshold = 0.1
loss_threshold_count = 0

def main():
    training_generator = False
    total_loss = 0
    total_round = 150
    batch_size = 800
    for i in range(2 * total_round):
        if i%2 == 0:
            print('%d/%d' % (i//2 + 1, total_round))
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
        if i%2 != 0:
            print('')
        global loss_threshold_count
        if i >= 80 and average_loss < loss_threshold:
            loss_threshold_count += 1
        else:
            loss_threshold_count = 0
        if loss_threshold_count >= 4:
            break
        training_generator = not training_generator
        total_loss = 0



main()

torch.save(discriminator.state_dict(), 'data/discriminator')
torch.save(generator.state_dict(), 'data/generator')
print('training finished')
