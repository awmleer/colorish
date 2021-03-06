import json

from django.db import models

class Scheme(models.Model):
    colors = models.TextField(default='[]')
    def get_colors(self):
        return json.loads(self.colors)
    def set_colors(self, colors):
        self.colors = json.dumps(colors)
    view_count = models.PositiveIntegerField(default=0)
    quality = models.FloatField()
    time = models.FloatField()
    network_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    liked_users = models.ManyToManyField(to='auth.User', related_name='likes')

    def like_count(self):
        return self.liked_users.count()

    def as_dict(self, user=None):
        return {
            'id': self.id,
            'colors': self.get_colors(),
            'viewCount': self.view_count,
            'time': self.time,
            'networkId': self.network_id,
            'createdAt': str(self.created_at),
            'quality': self.quality,
            'liked': None if user is None else self.liked_users.filter(id=user.id).exists(),
            'likeCount': self.like_count(),
        }

