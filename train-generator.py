import torch
from torch import nn

from networks import Generator, Discriminator
from utils import random_color_list, color_list_to_tensor

generator = Generator()

discriminator = Discriminator()
discriminator.load_state_dict(torch.load('data/discriminator-state-dict'))

criterion = nn.MSELoss()

learning_rate = 0.001

def train():
    generator.zero_grad()
    generated = generator(torch.rand(5))
    output = discriminator(generated)
    loss = criterion(output, torch.tensor(1.0))
    loss.backward()
    for p in generator.parameters():
        p.data.add_(-learning_rate, p.grad.data)
    return output, loss.item()

total_loss = 0
count = 0

while True:
    _, loss = train()
    total_loss += loss
    count = (count + 1) % 500
    if count == 0:
        average_loss = total_loss / 500
        print('%.5f' % average_loss)
        if average_loss < 0.0001:
            break
        total_loss = 0

torch.save(generator.state_dict(), 'data/generator-state-dict')
print('training finished')

