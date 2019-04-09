import colorsys

def tensorToRGB(tensor):
    rgb = colorsys.hsv_to_rgb(tensor[0][0].item(), tensor[0][1].item(), tensor[0][2].item())
    return round(rgb[0] * 256), round(rgb[1] * 256), round(rgb[2] * 256)
