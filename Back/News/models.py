from django.db import models
from User.models import User


class News(models.Model):
    message = models.TextField()
    user_first_name = models.TextField()
    user_last_name = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.user_first_name} {self.user_last_name}: {self.message}"
