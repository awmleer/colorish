from django.db import models

# Create your models here.
class Sample(models.Model):
    colors = models.CharField(max_length=200)


