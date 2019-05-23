import sys
import torch

from networks import Discriminator, Generator
from utils import tensor_to_color_list

# discriminator = Discriminator()
# discriminator.load_state_dict(torch.load('data/discriminator'))

generator = Generator()
generator.load_state_dict(torch.load('state-dict/' + sys.argv[1] + '/generator'))


def sample():
    generated = generator(torch.rand(16))
    colors = tensor_to_color_list(generated)
    for color in colors:
        print('<div class="color-block" style="background-color: rgb(%d, %d, %d)"></div>' % (color[0], color[1], color[2]))
    return colors

print('<div>')
for i in range(5):
    print('<div class="scheme">')
    sample()
    print('</div>')
print('</div>')

