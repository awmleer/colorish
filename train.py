import colorsys
import json

import torch
import torch.nn as nn
from networks import Discriminator

criterion = nn.MSELoss()

learning_rate = 0.01

def train(input_line_tensor, isFake):
    discriminator.zero_grad()
    output = discriminator(input_line_tensor)
    loss = criterion(output, torch.tensor(0.0) if isFake else torch.tensor(1.0))
    loss.backward()

    for p in discriminator.parameters():
        p.data.add_(-learning_rate, p.grad.data)

    return output, loss.item()


discriminator = Discriminator()

colorFile = open('data/color.txt')
fakeColorFile = open('data/fake-color.txt')

total_loss = 0
count = 0
isFake = True
while True:
    isFake = not isFake
    if isFake:
        line = fakeColorFile.readline()
    else:
        line = colorFile.readline()
    if line == '':
        break
    colors = json.loads(line)
    # input_tensor = torch.zeros(15, dtype=torch.float)
    data = []
    for color in colors:
        hsv = colorsys.rgb_to_hsv(color[0]/256, color[1]/256, color[2]/256)
        for i in range(3):
            data.append(hsv[i])
    input_tensor = torch.tensor(data)
    _, loss = train(input_tensor, isFake)
    total_loss += loss
    count = (count + 1) % 1000
    if count == 0:
        print('%.4f' % (total_loss/1000))
        total_loss = 0


torch.save(discriminator.state_dict(), 'data/discriminator-state-dict')
print('training finished')
