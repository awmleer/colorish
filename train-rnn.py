import colorsys
import json

import torch
import torch.nn as nn
from networks import RNN

criterion = nn.SmoothL1Loss()

learning_rate = 0.0005
# learning_rate = 0.0005

def train(input_line_tensor):
    # target_line_tensor = input_line_tensor.unsqueeze(-1)
    hidden = rnn.initHidden()

    rnn.zero_grad()

    loss = 0

    for i in range(5):
        output, hidden = rnn(input_line_tensor[i], hidden)
        if i < 4:
            l = criterion(output, input_line_tensor[i+1])
            loss += l

    loss.backward()

    for p in rnn.parameters():
        p.data.add_(-learning_rate, p.grad.data)

    return output, loss.item() / input_line_tensor.size(0)


rnn = RNN(3, 8, 3)

with open('data/color.txt') as f:
    total_loss = 0
    count = 0
    while True:
        line = f.readline()
        if line == '':
            break
        colors = json.loads(line)
        # print(colors)
        input_tensor = torch.zeros(len(colors), 1, 3, dtype=torch.float)
        for i in range(len(colors)):
            color = colors[i]
            hsv = colorsys.rgb_to_hsv(color[0]/256, color[1]/256, color[2]/256)
            # print(hsv)
            input_tensor[i][0][0] = hsv[0]
            input_tensor[i][0][1] = hsv[1]
            input_tensor[i][0][2] = hsv[2]
        _, loss = train(input_tensor)
        total_loss += loss
        count = (count + 1) % 1000
        if count == 0:
            print('%.4f' % (total_loss/1000))
            total_loss = 0


torch.save(rnn.state_dict(), 'data/state-dict')
print('training finished')
