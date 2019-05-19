import json

from django.db import models

class Schema(models.Model):
    colors = models.TextField(default='[]')
    def get_colors(self):
        return json.loads(self.colors)
    def set_colors(self, colors):
        self.colors = json.dumps(colors)
    view_count = models.PositiveIntegerField(default=0)
    time = models.FloatField()
    network_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def as_dict(self):
        return {
            'colors': self.get_colors(),
            'viewCount': self.view_count,
            'time': self.time,
            'networkId': self.network_id,
            'createdAt': str(self.created_at),
        }

