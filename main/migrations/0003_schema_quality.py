# Generated by Django 2.2 on 2019-05-20 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_auto_20190519_0845'),
    ]

    operations = [
        migrations.AddField(
            model_name='schema',
            name='quality',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
    ]
