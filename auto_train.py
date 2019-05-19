import importlib
import os
import sys
import train


for network_id in sys.argv[1:]:
    importlib.reload(train)
    print('Start training model #' + network_id)
    target_dir = 'state-dict/' + network_id
    os.mkdir(target_dir)
    train.train(target_dir)
