import importlib
import os
import shutil
import sys
import train


for network_id in sys.argv[1:]:
    importlib.reload(train)
    print('Starting training model #' + network_id)
    train.train()
    target_dir = 'state-dict/' + network_id
    os.mkdir(target_dir)
    shutil.copyfile('data/discriminator', target_dir + '/discriminator')
    shutil.copyfile('data/generator', target_dir + '/generator')
