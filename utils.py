import colorsys
import random

import torch


def tensorToRGB(tensor):
    rgb = colorsys.hsv_to_rgb(tensor[0][0].item(), tensor[0][1].item(), tensor[0][2].item())
    return round(rgb[0] * 256), round(rgb[1] * 256), round(rgb[2] * 256)

def color_list_to_tensor(colors):
    data = []
    for color in colors:
        hsv = colorsys.rgb_to_hsv(color[0]/256, color[1]/256, color[2]/256)
        for i in range(3):
            data.append(hsv[i])
    return torch.tensor(data)


def random_color_list():
    result = []
    for _ in range(5):
        c = []
        for _ in range(3):
            c.append(random.randrange(256))
        result.append(c)
    return result
