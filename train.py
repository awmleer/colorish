import colorsys
import json

import torch
import torch.nn as nn

class RNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(RNN, self).__init__()
        self.hidden_size = hidden_size

        self.i2h = nn.Linear(input_size + hidden_size, hidden_size)
        self.i2o = nn.Linear(input_size + hidden_size, output_size)
        self.o2o = nn.Linear(hidden_size + output_size, output_size)
        # self.dropout = nn.Dropout(0.1)
        # self.softmax = nn.LogSoftmax(dim=1)

    def forward(self, input, hidden):
        input_combined = torch.cat((input, hidden), 1)
        hidden = self.i2h(input_combined)
        output = self.i2o(input_combined)
        output_combined = torch.cat((hidden, output), 1)
        output = self.o2o(output_combined)
        # output = self.dropout(output)
        # output = self.softmax(output)
        return output, hidden

    def initHidden(self):
        return torch.zeros(1, self.hidden_size)



criterion = nn.MSELoss()

learning_rate = 0.0005

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



rnn = RNN(3, 128, 3)

with open('data/color.txt') as f:
    while True:
        line = f.readline()
        if line == '':
            break
        colors = json.loads(line)
        print(colors)
        input_tensor = torch.zeros(len(colors), 1, 3, dtype=torch.float)
        for i in range(len(colors)):
            color = colors[i]
            hsv = colorsys.rgb_to_hsv(color[0], color[1], color[2])
            input_tensor[i][0][0] = hsv[0]
            input_tensor[i][0][1] = hsv[1]
            input_tensor[i][0][2] = hsv[2]
        train(input_tensor)


print('training finished')
