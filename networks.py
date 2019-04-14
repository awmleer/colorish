import torch
import torch.nn as nn

class RNN(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(RNN, self).__init__()
        self.hidden_size = hidden_size

        self.i2h = nn.Linear(input_size + hidden_size, hidden_size)
        self.i2o = nn.Linear(input_size + hidden_size, output_size)
        self.o2o = nn.Linear(hidden_size + output_size, output_size)

    def forward(self, input, hidden):
        input_combined = torch.cat((input, hidden), 1)
        hidden = self.i2h(input_combined)
        output = self.i2o(input_combined)
        output_combined = torch.cat((hidden, output), 1)
        output = self.o2o(output_combined)
        return output, hidden

    def initHidden(self):
        return torch.zeros(1, self.hidden_size)


class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(15, 15), nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(15, 15), nn.Sigmoid(),
            nn.Linear(15, 5), nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(5, 1)
        )

    def forward(self, input_tensor):
        return self.main(input_tensor)


class Generator(nn.Module):
    def __init__(self):
        super(Generator, self).__init__()
        self.main = nn.Sequential(
            nn.Linear(5, 15), nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(15, 15), nn.Sigmoid(),
            nn.Linear(15, 15), nn.LeakyReLU(0.2, inplace=True),
        )

    def forward(self, input_tensor):
        return self.main(input_tensor)

