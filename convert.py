import csv
import json

csv_file = open('temp/kuler.csv')
color_file = open('data/kuler.txt', mode='a')

reader = csv.reader(csv_file)
count = 0
# a = 0
for row in reader:
    count += 1
    print(count)
    data = json.loads(json.loads(row[1]))
    # if len(data['tags']) > 0:
    #     a += 1
    colors = []
    for swatch in data['swatches']:
        h = swatch['hex']
        colors.append(list(int(h[i:i + 2], 16) for i in (0, 2, 4)))
    color_file.write(json.dumps(colors) + '\n')

# print(a)
# 3563
