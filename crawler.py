import json
import time
import requests
# import colorsys

f = open('data/color.txt', mode='a')

while True:
    r = requests.post('http://colormind.io/api/', json={
        'model': 'default'
    })
    result = r.json()['result']
    print(result)
    # converted = []
    # for c in result:
    #     converted.append(colorsys.rgb_to_hsv(c[0], c[1], c[2]))
    # print(converted)
    f.write(json.dumps(result) + '\n')
    time.sleep(0.3)

