import torch.nn as nn


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
            nn.Linear(16, 16), nn.LeakyReLU(0.3, inplace=True),
            # nn.Linear(16, 16), nn.LeakyReLU(0.2, inplace=True),
            nn.Linear(16, 15), nn.Sigmoid(),
        )

    def forward(self, input_tensor):
        return self.main(input_tensor)

